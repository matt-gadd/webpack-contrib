import * as ts from 'typescript';
import * as path from 'path';

const dImportPath = '@dojo/widget-core/d';
const wPragma = 'w';
const registryItemPrefix = '__autoRegistryItem_';
const registryBagName = '__autoRegistryItems';
const registryDecoratorNamedImport = 'registry';
const registryDecoratorNamedImportAlias = '__autoRegistry';
const registryDecoratorModulePath = '@dojo/widget-core/decorators/registry';

function createArrowFuncForDefaultImport(modulePath: string) {
	return ts.createCall((ts as any).createSignatureDeclaration(ts.SyntaxKind.ImportKeyword), undefined, [
		ts.createLiteral(`${modulePath}`)
	]);
}

function createArrowFuncForNamedImport(modulePath: string, namedImport: string) {
	return ts.createCall(
		ts.createPropertyAccess(
			ts.createCall((ts as any).createSignatureDeclaration(ts.SyntaxKind.ImportKeyword), undefined, [
				ts.createLiteral(`${modulePath}`)
			]),
			ts.createIdentifier('then')
		),
		undefined,
		[
			ts.createArrowFunction(
				undefined,
				undefined,
				[ts.createParameter(undefined, undefined, undefined, ts.createIdentifier('module'))],
				undefined,
				undefined,
				ts.createPropertyAccess(ts.createIdentifier('module'), ts.createIdentifier(namedImport))
			)
		]
	);
}

function createRegistryImportDeclaration() {
	const moduleSpecifier = ts.createLiteral(registryDecoratorModulePath);
	const importIdentifier = ts.createIdentifier(registryDecoratorNamedImport);
	const aliasIdentifier = ts.createIdentifier(registryDecoratorNamedImportAlias);
	const importSpecifier = ts.createImportSpecifier(importIdentifier, aliasIdentifier);
	const namedImport = ts.createNamedImports([importSpecifier]);
	const importClause = ts.createImportClause(undefined, namedImport);
	return ts.createImportDeclaration(undefined, undefined, importClause, moduleSpecifier);
}

class Visitor {
	private context: ts.TransformationContext;
	private contextPath: string;
	private basePath: string;
	private bundlePaths: string[];
	private legacyModule: boolean;
	private wPragma: undefined | string;
	private modulesMap = new Map<string, string>();
	private classMap = new Map<ts.Node, any>();

	constructor(options: any) {
		this.context = options.context;
		this.contextPath = options.contextPath;
		this.bundlePaths = options.bundlePaths;
		this.basePath = options.basePath;
		this.legacyModule = options.legacyModule;
	}

	public visit(node: ts.Node) {
		if (ts.isImportDeclaration(node)) {
			const importPath = (node.moduleSpecifier as ts.StringLiteral).text;
			const targetPath = path.resolve(this.contextPath, importPath).replace(`${this.basePath}/`, '');

			if (this.bundlePaths.indexOf(targetPath) !== -1) {
				this.setLazyImport(node);
			} else if (dImportPath === importPath) {
				this.setWPragma(node);
			}
		}
		if (this.isWCall(node)) {
			const text = node.arguments[0].getText();
			if (this.modulesMap.get(text)) {
				node = this.replaceWidgetClassWithString(node);
			}
		}
		return ts.visitEachChild(node, this.visit.bind(this), this.context);
	}

	public end(node: ts.SourceFile) {
		const registryImport = createRegistryImportDeclaration();
		const statements = this.removeImportStatements(node.statements);
		const registryStatements = this.getRegistryStatements();
		return ts.updateSourceFileNode(node, [registryImport, ...registryStatements, ...statements]);
	}

	private setLazyImport(node: ts.ImportDeclaration) {
		const importPath = (node.moduleSpecifier as ts.StringLiteral).text;
		const importClause = node.importClause;
		if (importClause && importClause.name && importClause.name.text) {
			this.modulesMap.set(importClause.name.text, importPath);
		}
	}

	private setWPragma(node: ts.ImportDeclaration) {
		if (node.importClause) {
			const namedBindings = node.importClause.namedBindings as ts.NamedImports;
			namedBindings.elements.some((element: ts.ImportSpecifier) => {
				const text = element.name.getText();
				if (text === wPragma || (element.propertyName && element.propertyName.escapedText === wPragma)) {
					this.wPragma = text;
					return true;
				}
			});
		}
	}

	private replaceWidgetClassWithString(node: ts.CallExpression) {
		const text = node.arguments[0].getText();
		const targetClass = this.findParentClass(node);
		if (targetClass) {
			const registryItems = this.classMap.get(targetClass) || {};
			registryItems[text] = this.modulesMap.get(text);
			this.classMap.set(targetClass, registryItems);
			const registryIdentifier = ts.createLiteral(`${registryItemPrefix}${text}`);
			return ts.updateCall(node, node.expression, node.typeArguments, [
				registryIdentifier,
				...node.arguments.slice(1)
			]);
		}
		return node;
	}

	private getRegistryStatements() {
		const registryStatements: any[] = [];
		this.classMap.forEach((registry: any, key: ts.Node) => {
			const registryItems = Object.keys(registry).map((label) => {
				const modulePath = registry[label];
				const importCall = createArrowFuncForDefaultImport(modulePath);
				return ts.createPropertyAssignment(
					`'${registryItemPrefix}${label}'`,
					ts.createArrowFunction(undefined, undefined, [], undefined, undefined, importCall)
				);
			});
			const registryVariableName = ts.createUniqueName(registryBagName);
			const registryStatement = ts.createVariableStatement(
				undefined,
				ts.createVariableDeclarationList([
					ts.createVariableDeclaration(
						registryVariableName,
						undefined,
						ts.createObjectLiteral(registryItems, false)
					)
				])
			);
			registryStatements.push(registryStatement);
		});
		return registryStatements;
	}

	private removeImportStatements(nodes: ts.NodeArray<ts.Statement>) {
		const importsToRemove: string[] = [];
		this.classMap.forEach((registry: any, key: ts.Node) => {
			Object.keys(registry).forEach((label) => {
				importsToRemove.push(registry[label]);
			});
		});
		return nodes.filter((node: ts.Node) => {
			if (
				ts.isImportDeclaration(node) &&
				importsToRemove.indexOf((node.moduleSpecifier as ts.StringLiteral).text) !== -1
			) {
				return false;
			}
			return true;
		});
	}

	private isWCall(node: ts.Node): node is ts.CallExpression {
		return !!(
			this.wPragma &&
			this.modulesMap.size &&
			ts.isCallExpression(node) &&
			node.expression.getText() === this.wPragma &&
			node.arguments &&
			node.arguments.length
		);
	}

	private findParentClass(node: ts.Node): ts.Node | undefined {
		let parent = node.parent;
		while (parent) {
			if (ts.isClassDeclaration(parent)) {
				return parent;
			}
			parent = parent.parent;
		}
	}
}

const registryTransformer = function(
	this: { basePath: string; bundlePaths: string[] },
	context: ts.TransformationContext
) {
	const basePath = this.basePath;
	const bundlePaths = this.bundlePaths;
	const opts = context.getCompilerOptions();
	const { module } = opts;
	const legacyModule =
		module === ts.ModuleKind.CommonJS || module === ts.ModuleKind.AMD || module === ts.ModuleKind.UMD;
	return function(node: ts.SourceFile) {
		const contextPath = path.dirname(path.relative(basePath, node.getSourceFile().fileName));
		const visitor = new Visitor({ context, contextPath, bundlePaths, basePath, legacyModule });
		let result = ts.visitNode(node, visitor.visit.bind(visitor));
		return visitor.end(result);
	};
};

export default (basePath: string, bundlePaths: string[]) => registryTransformer.bind({ bundlePaths, basePath });
