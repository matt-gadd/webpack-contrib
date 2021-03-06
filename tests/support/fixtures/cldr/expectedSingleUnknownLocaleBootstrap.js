var has = require('@dojo/framework/core/has').default;
var i18n = require('@dojo/framework/i18n/i18n');

i18n.setCldrLoaders({ 'zh-CN': function() {
	var promises = [];

	if (has('__i18n_date__')) {
		promises.push(
			import(/* webpackChunkName: "i18n/zh/date-time" */ 'cldr-data/main/zh/ca-gregorian.json')
		);
		promises.push(
			import(/* webpackChunkName: "i18n/zh/date-time" */ 'cldr-data/main/zh/dateFields.json')
		);
		promises.push(
			import(/* webpackChunkName: "i18n/zh/date-time" */ 'cldr-data/main/zh/timeZoneNames.json')
		);
	}
	if (has('__i18n_number__')) {
		promises.push(
			import(/* webpackChunkName: "i18n/zh/currency" */ 'cldr-data/main/zh/currencies.json')
		);
	}
	if (has('__i18n_date__') || has('__i18n_number__') || has('__i18n_unit__')) {
		promises.push(
			import(/* webpackChunkName: "i18n/zh/common" */ 'cldr-data/main/zh/numbers.json')
		);
	}
	if (has('__i18n_unit__')) {
		promises.push(import(/* webpackChunkName: "i18n/zh/unit" */ 'cldr-data/main/zh/units.json'));
	}

	return Promise.all(promises);
},'zh': function() {
	var promises = [];

	if (has('__i18n_date__')) {
		promises.push(
			import(/* webpackChunkName: "i18n/zh/date-time" */ 'cldr-data/main/zh/ca-gregorian.json')
		);
		promises.push(
			import(/* webpackChunkName: "i18n/zh/date-time" */ 'cldr-data/main/zh/dateFields.json')
		);
		promises.push(
			import(/* webpackChunkName: "i18n/zh/date-time" */ 'cldr-data/main/zh/timeZoneNames.json')
		);
	}
	if (has('__i18n_number__')) {
		promises.push(
			import(/* webpackChunkName: "i18n/zh/currency" */ 'cldr-data/main/zh/currencies.json')
		);
	}
	if (has('__i18n_date__') || has('__i18n_number__') || has('__i18n_unit__')) {
		promises.push(
			import(/* webpackChunkName: "i18n/zh/common" */ 'cldr-data/main/zh/numbers.json')
		);
	}
	if (has('__i18n_unit__')) {
		promises.push(import(/* webpackChunkName: "i18n/zh/unit" */ 'cldr-data/main/zh/units.json'));
	}

	return Promise.all(promises);
}, fallback: function () {
		return Promise.all([
			import(/* webpackChunkName: "i18n/supplemental/fallback" */ 'cldr-core/supplemental/likelySubtags.json'),
			import(/* webpackChunkName: "i18n/supplemental/fallback" */ 'cldr-core/supplemental/plurals.json')
		]);
	}, supplemental: function() {
	var promises = [
		Promise.resolve({ default: {"supplemental":{"version":{"_unicodeVersion":"12.1.0","_cldrVersion":"36"},"parentLocales":{"parentLocale":{"en-150":"en-001","en-AG":"en-001","en-AI":"en-001","en-AU":"en-001","en-BB":"en-001","en-BM":"en-001","en-BS":"en-001","en-BW":"en-001","en-BZ":"en-001","en-CA":"en-001","en-CC":"en-001","en-CK":"en-001","en-CM":"en-001","en-CX":"en-001","en-CY":"en-001","en-DG":"en-001","en-DM":"en-001","en-ER":"en-001","en-FJ":"en-001","en-FK":"en-001","en-FM":"en-001","en-GB":"en-001","en-GD":"en-001","en-GG":"en-001","en-GH":"en-001","en-GI":"en-001","en-GM":"en-001","en-GY":"en-001","en-HK":"en-001","en-IE":"en-001","en-IL":"en-001","en-IM":"en-001","en-IN":"en-001","en-IO":"en-001","en-JE":"en-001","en-JM":"en-001","en-KE":"en-001","en-KI":"en-001","en-KN":"en-001","en-KY":"en-001","en-LC":"en-001","en-LR":"en-001","en-LS":"en-001","en-MG":"en-001","en-MO":"en-001","en-MS":"en-001","en-MT":"en-001","en-MU":"en-001","en-MW":"en-001","en-MY":"en-001","en-NA":"en-001","en-NF":"en-001","en-NG":"en-001","en-NR":"en-001","en-NU":"en-001","en-NZ":"en-001","en-PG":"en-001","en-PH":"en-001","en-PK":"en-001","en-PN":"en-001","en-PW":"en-001","en-RW":"en-001","en-SB":"en-001","en-SC":"en-001","en-SD":"en-001","en-SG":"en-001","en-SH":"en-001","en-SL":"en-001","en-SS":"en-001","en-SX":"en-001","en-SZ":"en-001","en-TC":"en-001","en-TK":"en-001","en-TO":"en-001","en-TT":"en-001","en-TV":"en-001","en-TZ":"en-001","en-UG":"en-001","en-VC":"en-001","en-VG":"en-001","en-VU":"en-001","en-WS":"en-001","en-ZA":"en-001","en-ZM":"en-001","en-ZW":"en-001","en-AT":"en-150","en-BE":"en-150","en-CH":"en-150","en-DE":"en-150","en-DK":"en-150","en-FI":"en-150","en-NL":"en-150","en-SE":"en-150","en-SI":"en-150","es-AR":"es-419","es-BO":"es-419","es-BR":"es-419","es-BZ":"es-419","es-CL":"es-419","es-CO":"es-419","es-CR":"es-419","es-CU":"es-419","es-DO":"es-419","es-EC":"es-419","es-GT":"es-419","es-HN":"es-419","es-MX":"es-419","es-NI":"es-419","es-PA":"es-419","es-PE":"es-419","es-PR":"es-419","es-PY":"es-419","es-SV":"es-419","es-US":"es-419","es-UY":"es-419","es-VE":"es-419","pt-AO":"pt-PT","pt-CH":"pt-PT","pt-CV":"pt-PT","pt-FR":"pt-PT","pt-GQ":"pt-PT","pt-GW":"pt-PT","pt-LU":"pt-PT","pt-MO":"pt-PT","pt-MZ":"pt-PT","pt-ST":"pt-PT","pt-TL":"pt-PT","az-Arab":"root","az-Cyrl":"root","blt-Latn":"root","bm-Nkoo":"root","bs-Cyrl":"root","byn-Latn":"root","cu-Glag":"root","dje-Arab":"root","dyo-Arab":"root","en-Dsrt":"root","en-Shaw":"root","ff-Adlm":"root","ff-Arab":"root","ha-Arab":"root","iu-Latn":"root","kk-Arab":"root","ku-Arab":"root","ky-Arab":"root","ky-Latn":"root","ml-Arab":"root","mn-Mong":"root","ms-Arab":"root","pa-Arab":"root","sd-Deva":"root","sd-Khoj":"root","sd-Sind":"root","shi-Latn":"root","so-Arab":"root","sr-Latn":"root","sw-Arab":"root","tg-Arab":"root","ug-Cyrl":"root","uz-Arab":"root","uz-Cyrl":"root","vai-Latn":"root","wo-Arab":"root","yo-Arab":"root","yue-Hans":"root","zh-Hant":"root","zh-Hant-MO":"zh-Hant-HK"}}}} }),
		Promise.resolve({ default: {"supplemental":{"version":{"_unicodeVersion":"12.1.0","_cldrVersion":"36"},"likelySubtags":{"und-030":"zh-Hans-CN","und-142":"zh-Hans-CN","und-Bopo":"zh-Bopo-TW","und-CN":"zh-Hans-CN","und-Hanb":"zh-Hanb-TW","und-Hani":"zh-Hani-CN","und-Hans":"zh-Hans-CN","und-Hant":"zh-Hant-TW","und-HK":"zh-Hant-HK","und-MO":"zh-Hant-MO","und-Nshu":"zhx-Nshu-CN","und-TW":"zh-Hant-TW","zh":"zh-Hans-CN","zh-AU":"zh-Hant-AU","zh-BN":"zh-Hant-BN","zh-Bopo":"zh-Bopo-TW","zh-GB":"zh-Hant-GB","zh-GF":"zh-Hant-GF","zh-Hanb":"zh-Hanb-TW","zh-Hant":"zh-Hant-TW","zh-HK":"zh-Hant-HK","zh-ID":"zh-Hant-ID","zh-MO":"zh-Hant-MO","zh-MY":"zh-Hant-MY","zh-PA":"zh-Hant-PA","zh-PF":"zh-Hant-PF","zh-PH":"zh-Hant-PH","zh-SR":"zh-Hant-SR","zh-TH":"zh-Hant-TH","zh-TW":"zh-Hant-TW","zh-US":"zh-Hant-US","zh-VN":"zh-Hant-VN","zhx":"zhx-Nshu-CN"}}} }),
		Promise.resolve({ default: {"supplemental":{"version":{"_unicodeVersion":"12.1.0","_cldrVersion":"36"},"plurals-type-cardinal":{"zh":{"pluralRule-count-other":" @integer 0~15, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"}}}} })
	];

	if (has('__i18n_date__')) {
		promises.push(
			import(/* webpackChunkName: "i18n/supplemental/date-time" */ 'cldr-core/supplemental/weekData.json')
		);
		promises.push(
			import(/* webpackChunkName: "i18n/supplemental/date-time" */ 'cldr-core/supplemental/timeData.json')
		);
	}
	if (has('__i18n_number__')) {
		promises.push(
			import(/* webpackChunkName: "i18n/supplemental/currency" */ 'cldr-core/supplemental/currencyData.json')
		);
	}
	if (has('__i18n_date__') || has('__i18n_number__') || has('__i18n_unit__')) {
		promises.push(
			import(/* webpackChunkName: "i18n/supplemental/common" */ 'cldr-core/supplemental/ordinals.json')
		);
		promises.push(
			import(
				/* webpackChunkName: "i18n/supplemental/common" */ 'cldr-core/supplemental/numberingSystems.json'
			)
		);
	}

	return Promise.all(promises);
} });
i18n.setSupportedLocales(["zh-CN","zh"]);
i18n.setDefaultLocale('zh-CN');
export default i18n.setLocale({ default: true });
