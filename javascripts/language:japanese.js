/**
 * (C) 2009 Daleki-Wschod.pl
 * (C) Michał „mcv” Gawron
 * TODO The なければ nakereba form used for the negative form can be colloquially contracted to なきゃ nakya or なくちゃ nakucha. Thus 行かなければ ikanakereba can become 行かなきゃ ikanakya.
 */


Japanese = Class.create ({})


Exception = Class.create ({
	initialize:
		function (message)
		{
			this.message = message
		}
})


Japanese.InvalidWord = Class.create (Exception, {})


/**
 * Word
 */


Japanese.Word = Class.create ({})


Japanese.Word.U_VERB		= 'u-verb'
Japanese.Word.RU_VERB		= 'ru-verb'
Japanese.Word.SURU_VERB		= 'suru-verb'
Japanese.Word.ADVERB		= 'adverb'
Japanese.Word.I_ADJECTIVE	= 'i-adjective'
Japanese.Word.NA_ADJECTIVE	= 'na-adjective'
Japanese.Word.NOUN			= 'noun'


Japanese.Hiragana = {
	TABLE1: {
		'':  { a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お' },
		'k': { a: 'か', i: 'き', u: 'く', e: 'け', o: 'こ' },
		'g': { a: 'が', i: 'ぎ', u: 'ぐ', e: 'げ', o: 'ご' },
		's': { a: 'さ', i: 'し', u: 'す', e: 'せ', o: 'そ' },
		'z': { a: 'ざ', i: 'じ', u: 'ず', e: 'ぜ', o: 'ぞ' },
		't': { a: 'た', i: 'ち', u: 'つ', e: 'て', o: 'と' },
		'd': { a: 'だ', i: 'ぢ', u: 'づ', e: 'で', o: 'ど' },
		'n': { a: 'な', i: 'に', u: 'ぬ', e: 'ね', o: 'の' },
		'h': { a: 'は', i: 'ひ', u: 'ふ', e: 'へ', o: 'ほ' },
		'b': { a: 'ば', i: 'び', u: 'ぶ', e: 'べ', o: 'ぼ' },
		'p': { a: 'ぱ', i: 'ぴ', u: 'ぷ', e: 'ぺ', o: 'ぽ' },
		'm': { a: 'ま', i: 'み', u: 'む', e: 'め', o: 'も' },
		'y': { a: 'や', i: '',   u: 'ゆ', e: '',   o: 'よ' },
		'r': { a: 'ら', i: 'り', u: 'る', e: 'れ', o: 'ろ' },
		'w': { a: 'わ', i: '',   u: '',   e: '',   o: 'を' },
		'N': { a: 'ん', i: '',   u: '',   e: '',   o: ''   }
	},

	TABLE2: {
		'あ': { v: 'a', c: '' },
		'い': { v: 'i', c: '' },
		'う': { v: 'u', c: '' },
		'え': { v: 'e', c: '' },
		'お': { v: 'o', c: '' },

		'か': { v: 'a', c: 'k' },
		'き': { v: 'i', c: 'k' },
		'く': { v: 'u', c: 'k' },
		'け': { v: 'e', c: 'k' },
		'こ': { v: 'o', c: 'k' },

		'が': { v: 'a', c: 'g' },
		'ぎ': { v: 'i', c: 'g' },
		'ぐ': { v: 'u', c: 'g' },
		'げ': { v: 'e', c: 'g' },
		'ご': { v: 'o', c: 'g' },

		'さ': { v: 'a', c: 's' },
		'し': { v: 'i', c: 's' },
		'す': { v: 'u', c: 's' },
		'せ': { v: 'e', c: 's' },
		'そ': { v: 'o', c: 's' },

		'ざ': { v: 'a', c: 'z' },
		'じ': { v: 'i', c: 'z' },
		'ず': { v: 'u', c: 'z' },
		'ぜ': { v: 'e', c: 'z' },
		'ぞ': { v: 'o', c: 'z' },

		'た': { v: 'a', c: 't' },
		'ち': { v: 'i', c: 't' },
		'つ': { v: 'u', c: 't' },
		'て': { v: 'e', c: 't' },
		'と': { v: 'o', c: 't' },

		'だ': { v: 'a', c: 'd' },
		'ぢ': { v: 'i', c: 'd' },
		'づ': { v: 'u', c: 'd' },
		'で': { v: 'e', c: 'd' },
		'ど': { v: 'o', c: 'd' },

		'な': { v: 'a', c: 'n' },
		'に': { v: 'i', c: 'n' },
		'ぬ': { v: 'u', c: 'n' },
		'ね': { v: 'e', c: 'n' },
		'の': { v: 'o', c: 'n' },

		'は': { v: 'a', c: 'h' },
		'ひ': { v: 'i', c: 'h' },
		'ふ': { v: 'u', c: 'h' },
		'へ': { v: 'e', c: 'h' },
		'ほ': { v: 'o', c: 'h' },

		'ば': { v: 'a', c: 'b' },
		'び': { v: 'i', c: 'b' },
		'ぶ': { v: 'u', c: 'b' },
		'べ': { v: 'e', c: 'b' },
		'ぼ': { v: 'o', c: 'b' },

		'ぱ': { v: 'a', c: 'p' },
		'ぴ': { v: 'i', c: 'p' },
		'ぷ': { v: 'u', c: 'p' },
		'ぺ': { v: 'e', c: 'p' },
		'ぽ': { v: 'o', c: 'p' },

		'ま': { v: 'a', c: 'm' },
		'み': { v: 'i', c: 'm' },
		'む': { v: 'u', c: 'm' },
		'め': { v: 'e', c: 'm' },
		'も': { v: 'o', c: 'm' },

		'や': { v: 'a', c: 'y' },
		'ゆ': { v: 'u', c: 'y' },
		'よ': { v: 'o', c: 'y' },

		'ら': { v: 'a', c: 'r' },
		'り': { v: 'i', c: 'r' },
		'る': { v: 'u', c: 'r' },
		'れ': { v: 'e', c: 'r' },
		'ろ': { v: 'o', c: 'r' },

		'わ': { v: 'a', c: 'w' },
		'を': { v: 'o', c: 'w' },

		'ん': { v: 'a', c: 'N' }
	},

	change_column:
		function (subject, to)
		{
			return Japanese.Hiragana.TABLE1[Japanese.Hiragana.TABLE2[subject].c][to]
		},

	romanize:
		function (kana)
		{
			var s = ''
			var c, k, z
			for (var i = 0, n = kana.length; i < n; ++i)
			{
				c = kana[i]
				switch (c)
				{
					case 'っ':
						k = Japanese.Hiragana.TABLE2[kana[i+1]]
						s += k.c
						break
					default:
						if (['ゃ', 'ゅ', 'ょ'].include (kana[i+1]))
						{
							z = (kana[i+1] == 'ゃ') ? 'a' : (kana[i+1] == 'ゅ') ? 'u' : 'o'
							k = Japanese.Hiragana.TABLE2[c]
							if (['き', 'ぎ', 'ぢ', 'に', 'ひ', 'び', 'ぴ', 'み', 'り'].include (c))
								s += k.c + 'y' + z
							else if (c == 'し')
								s += 'sh' + z
							else if (c == 'じ')
								s += 'j' + z
							else if (c == 'ち')
								s += 'ch' + z
							i += 1
						}
						else if (c == 'つ')
							s += 'tsu'
						else if (c == 'ち')
							s += 'chi'
						else if (c == 'し')
							s += 'shi'
						else if (c == 'じ')
							s += 'ji'
						else if (c == 'ふ')
							s += 'fu'
						else if (c == 'ん')
							s += 'n'
						else if (c == 'ぁ')
							s += 'a'
						else if (c == 'ぃ')
							s += 'i'
						else if (c == 'ぅ')
							s += 'u'
						else if (c == 'ぇ')
							s += 'e'
						else if (c == 'ぉ')
							s += 'o'
						else
						{
							k = Japanese.Hiragana.TABLE2[kana[i]]
							if (k !== undefined)
								s += k.c + k.v
							else
								s += kana[i]
						}
						break
				}
			}
			return s
		}
}


/**
 * Verb
 */


Japanese.Verb = Class.create (Japanese.Word, {
	initialize:
		function (klass, plain_form, base_form)
		{
			this.__klass = klass
			this.__plain_form = plain_form
			this.__base_form = base_form
		},

	base_form:
		function()
		{
			return this.__base_form
		},

	plain_form:
		function()
		{
			return this.__plain_form
		},

	plain_past_form:
		function()
		{
			// TE form; change TE->TA
			var te = this.te_form()
			return te.substr (0, te.length - 1) + Japanese.Hiragana.change_column (te.substr (te.length - 1, 1), 'a')
		},

	plain_past_negative_form:
		function()
		{
			return this.plain_negative_form() + 'でした'
		},

	teiru_form:
		function()
		{
			return this.te_form() + 'いる'
		},

	teimasu_form:
		function()
		{
			return this.te_form() + 'います'
		},

	__irregular:
		function()
		{
			if (this.__klass.IRREGULAR[this.plain_form()] !== undefined)
				return this.__klass.IRREGULAR[this.plain_form()]
			return {}
		},

	masu_form: null,
	masu_negative_form: null,
	masu_past_form: null,
	masu_past_negative_form: null,
	passive_form: null,
	passive_negative_form: null,
	causative_form: null,
	causative_negative_form: null,
	causative_masu_form: null,
	causative_masu_negative_form: null,
	causative_passive_form: null,
	causative_passive_negative_form: null,
	causative_passive_masu_form: null,
	causative_passive_masu_negative_form: null,
	volitional_form: null,
	volitional_negative_form: null,
	volitional_masu_form: null,
	volitional_masu_negative_form: null,
	conditional_eba_form: null,
	conditional_eba_negative_form: null,
	conditional_ra_form: null,
	conditional_ra_negative_form: null,
	potential_form: null,
	imperative_1_form: null,
	imperative_1_negative_form: null,
	imperative_2_form: null,
	imperative_2_negative_form: null
})


/**
 * U-Verb
 */


Japanese.UVerb = Class.create (Japanese.Verb, {
	initialize:
		function ($super, plain_form)
		{
			$super (Japanese.UVerb, plain_form, plain_form.substr (0, plain_form.length - 1))
			this.ending = plain_form[plain_form.length - 1]
			if (Japanese.UVerb.MAPPINGS[this.ending] === undefined)
				throw new Japanese.InvalidWord ('invalid u-verb')
		},

	plain_negative_form:
		function()
		{
			return this.__irregular().plain_negative || (this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'ない')
		},

	plain_past_negative_form:
		function()
		{
			return this.__irregular().plain_past_negative_form || (this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'なかった')
		},

	te_form:
		function()
		{
			return this.__irregular().te || (this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].te)
		},

	te_negative_form:
		function()
		{
			return this.__irregular().te_negative || (this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'ないで')
		},

	tai_form:
		function()
		{
			return this.__irregular().tai || (this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].i + 'たい')
		},

	tai_negative_form:
		function()
		{
			return this.__irregular().tai_negative || (this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].i + 'たくない')
		},

	masu_form:
		function()
		{
			return this.__irregular().masu || (this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].ma + 'す')
		},

	masu_negative_form:
		function()
		{
			return this.__irregular().masu_negative || (this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].ma + 'せん')
		},

	masu_past_form:
		function()
		{
			return this.__irregular().masu_past || (this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].ma + 'した')
		},

	masu_past_negative_form:
		function()
		{
			return this.__irregular().masu_past_negative || (this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].ma + 'せんでした')
		},

	passive_form:
		function()
		{
			return this.__irregular().passive || (this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'れる')
		},

	causative_form:
		function()
		{
			return this.__irregular().causative || (this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'せる')
		},

	causative_negative_form:
		function()
		{
			return this.__irregular().causative_negative || (this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'せない')
		},

	causative_masu_form:
		function()
		{
			return this.__irregular().causative_masu || (this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'せます')
		},

	causative_masu_negative_form:
		function()
		{
			return this.__irregular().causative_masu_negative || (this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'せません')
		},

	causative_passive_form:
		function()
		{
			return this.__irregular().causative_passive || (this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'せられる')
		},

	causative_passive_negative_form:
		function()
		{
			return this.__irregular().causative_passive_negative || (this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'せられない')
		},

	causative_passive_masu_form:
		function()
		{
			return this.__irregular().causative_passive_masu || (this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'せられます')
		},

	causative_passive_masu_negative_form:
		function()
		{
			return this.__irregular().causative_passive_negative_masu || (this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'せられません')
		},

	volitional_form:
		function()
		{
			return this.__irregular().volitional || (this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].ou)
		},

	volitional_negative_form:
		function()
		{
			return this.__irregular().volitional_negative || (this.plain_form() + 'まい')
		},

	volitional_masu_form:
		function()
		{
			return this.__irregular().volitional_masu || (this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].i + 'ましょう')
		},

	volitional_masu_negative_form:
		function()
		{
			return this.__irregular().volitional_masu_negative || (this.masu_form() + 'まい')
		},

	conditional_eba_form:
		function()
		{
			return this.__irregular().conditional_eba || (this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].e + 'ば')
		},

	conditional_ra_form:
		function()
		{
			return this.__irregular().conditional_ra || (this.plain_past_form() + 'ら')
		},

	potential_form:
		function()
		{
			return this.__irregular().potential || (this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].e + 'る')
		}
})


Japanese.UVerb.MAPPINGS = {
	'う': { te: 'って', a: 'わ', i: 'い', e: 'え', ma: 'いま', ou: 'おう' },
	'く': { te: 'いて', a: 'か', i: 'き', e: 'け', ma: 'きま', ou: 'こう' },
	'ぐ': { te: 'いで', a: 'が', i: 'ぎ', e: 'げ', ma: 'ぎま', ou: 'ごう' },
	'す': { te: 'して', a: 'さ', i: 'し', e: 'せ', ma: 'しま', ou: 'そう' },
	'つ': { te: 'って', a: 'た', i: 'ち', e: 'て', ma: 'ちま', ou: 'とう' },
	'ぬ': { te: 'んで', a: '',   i: 'に', e: 'ね', ma: 'にま', ou: 'のう' },
	'ぶ': { te: 'んで', a: 'ば', i: 'び', e: 'べ', ma: 'びま', ou: 'ぼう' },
	'む': { te: 'んで', a: 'ま', i: 'み', e: 'め', ma: 'みま', ou: 'もう' },
	'る': { te: 'って', a: 'ら', i: 'り', e: 'れ', ma: 'りま', ou: 'ろう' },
}



Japanese.UVerb.IRREGULAR = {
	'いく': {
		plain_negative: 'いかない',
		te: 'いって',
		te_negative: 'いかないで',
		tai: 'いきたい',
		tai_negative: 'いきたくない'
	},
	'ある': {
		plain_negative: 'ない',
		potential: 'ありえる'
	},
	'いらっしゃる': {
		te: 'いらっしゃって',
		masu: 'いらっしゃいます',
		masu_negative: 'いらっしゃいません',
		masu_past: 'いらっしゃいました',
		masu_past_negative: 'いらっしゃいませんでした',
	},
	'なさる': {
		te: 'なさって',
		masu: 'なさいます',
		masu_negative: 'なさいません',
		masu_past: 'なさいました',
		masu_past_negative: 'なさいませんでした',
	}
}


/**
 * Ru-Verb
 */


Japanese.RuVerb = Class.create (Japanese.Verb, {
	initialize:
		function ($super, plain_form)
		{
			$super (Japanese.RuVerb, plain_form, plain_form.substr (0, plain_form.length - 1))
			if (!plain_form.endsWith ('る'))
				throw new Japanese.InvalidWord ('invalid ru-verb: does not end with る')
		},

	plain_negative_form:
		function()
		{
			return this.__irregular().plain_negative || (this.base_form() + 'ない')
		},

	plain_past_negative_form:
		function()
		{
			return this.__irregular().plain_past_negative_form || (this.base_form() + 'なかった')
		},

	te_form:
		function()
		{
			return this.__irregular().te || (this.base_form() + 'て')
		},

	te_negative_form:
		function()
		{
			return this.__irregular().te_negative || (this.base_form() + 'ないで')
		},

	tai_form:
		function()
		{
			return this.__irregular().tai || (this.base_form() + 'たい')
		},

	tai_negative_form:
		function()
		{
			return this.__irregular().tai_negative || (this.base_form() + 'たくない')
		},

	masu_form:
		function()
		{
			return this.__irregular().masu || (this.base_form() + 'ます')
		},

	masu_negative_form:
		function()
		{
			return this.__irregular().masu_negative || (this.base_form() + 'ません')
		},

	masu_past_form:
		function()
		{
			return this.__irregular().masu_past || (this.base_form() + 'ました')
		},

	masu_past_negative_form:
		function()
		{
			return this.__irregular().masu_past_negative || (this.base_form() + 'ませんでした')
		},

	passive_form:
		function()
		{
			return this.__irregular().passive || (this.base_form() + 'られる')
		},

	causative_form:
		function()
		{
			return this.__irregular().causative || (this.base_form() + 'させる')
		},

	causative_negative_form:
		function()
		{
			return this.__irregular().causative_negative || (this.base_form() + 'させない')
		},

	causative_masu_form:
		function()
		{
			return this.__irregular().causative_masu || (this.base_form() + 'させます')
		},

	causative_masu_negative_form:
		function()
		{
			return this.__irregular().causative_masu_negative || (this.base_form() + 'させません')
		},

	causative_passive_form:
		function()
		{
			return this.__irregular().causative_passive || (this.base_form() + 'させられる')
		},

	causative_passive_negative_form:
		function()
		{
			return this.__irregular().causative_passive_negative || (this.base_form() + 'させられない')
		},

	causative_passive_masu_form:
		function()
		{
			return this.__irregular().causative_passive_masu || (this.base_form() + 'させられます')
		},

	causative_passive_masu_negative_form:
		function()
		{
			return this.__irregular().causative_passive_masu_negative || (this.base_form() + 'させられません')
		},

	volitional_form:
		function()
		{
			return this.__irregular().volitional || (this.base_form() + 'よう')
		},

	volitional_negative_form:
		function()
		{
			return this.__irregular().volitional_negative || (this.base_form() + 'まい')
		},

	volitional_masu_form:
		function()
		{
			return this.__irregular().volitional_masu || (this.base_form() + 'ましょう')
		},

	volitional_masu_negative_form:
		function()
		{
			return this.__irregular().volitional_masu_negative || (this.masu_form() + 'まい')
		},

	conditional_eba_form:
		function()
		{
			return this.__irregular().conditional_eba || (this.base_form() + 'れば')
		},

	conditional_ra_form:
		function()
		{
			return this.__irregular().conditional_ra || (this.plain_past_form() + 'ら')
		},

	potential_form:
		function()
		{
			return this.__irregular().potential || (this.base_form() + 'られる')
		}
})


Japanese.RuVerb.IRREGULAR = {
	'くる': {
		plain_negative: 'こない',
		te: 'きて',
		te_negative: 'こないで',
		tai: 'きたい',
		tai_negative: 'きたくない',
		masu: 'きます',
		masu_negative: 'きません',
		masu_past: 'きました',
		masu_past_negative: 'きませんでした',
		passive: 'こられる',
		causative: 'こさせる',
		causative_negative: 'こさせない',
		causative_masu: 'こさせます',
		causative_masu_negative: 'こさせません',
		causative_passive: 'こさせられる',
		causative_passive_negative: 'こさせられない',
		causative_passive_masu: 'こさせられます',
		causative_passive_masu_negative: 'こさせられません',
		volitional: 'こよう',
		volitional_negative: 'くるまい',
		volitional_masu: 'こよましょう',
		volitional_masu_negative: 'こよますまい',
		conditional_eba: 'くれば',
		conditional_ra: 'きたら',
		potential: 'こられる'
	}
}


/**
 * Suru-Verb
 */


Japanese.SuruVerb = Class.create (Japanese.Verb, {
	initialize:
		function ($super, plain_form)
		{
			$super (Japanese.SuruVerb, plain_form, plain_form.substr (0, plain_form.length - 2))
			if (!plain_form.endsWith ('する'))
				throw new Japanese.InvalidWord ('invalid suru-verb: does not end with する')
		},

	plain_negative_form:
		function()
		{
			return this.__irregular().plain_negative || (this.base_form() + 'しない')
		},

	te_form:
		function()
		{
			return this.__irregular().te || (this.base_form() + 'して')
		},

	te_negative_form:
		function()
		{
			return this.__irregular().te_negative || (this.base_form() + 'しないで')
		},

	tai_form:
		function()
		{
			return this.__irregular().tai || (this.base_form() + 'したい')
		},

	tai_negative_form:
		function()
		{
			return this.__irregular().tai_negative || (this.base_form() + 'したくない')
		},

	masu_form:
		function()
		{
			return this.__irregular().masu || (this.base_form() + 'します')
		},

	masu_negative_form:
		function()
		{
			return this.__irregular().masu_negative || (this.base_form() + 'しません')
		},

	masu_past_form:
		function()
		{
			return this.__irregular().masu_past || (this.base_form() + 'しました')
		},

	masu_past_negative_form:
		function()
		{
			return this.__irregular().masu_past_negative || (this.base_form() + 'しませんでした')
		},

	passive_form:
		function()
		{
			return this.__irregular().passive || (this.base_form() + 'される')
		},

	causative_form:
		function()
		{
			return this.__irregular().causative || (this.base_form() + 'させる')
		},

	causative_negative_form:
		function()
		{
			return this.__irregular().causative_negative || (this.base_form() + 'させない')
		},

	causative_masu_form:
		function()
		{
			return this.__irregular().causative_masu || (this.base_form() + 'させます')
		},

	causative_masu_negative_form:
		function()
		{
			return this.__irregular().causative_masu_negative || (this.base_form() + 'させません')
		},

	causative_passive_form:
		function()
		{
			return this.__irregular().causative_passive || (this.base_form() + 'させられる')
		},

	causative_passive_negative_form:
		function()
		{
			return this.__irregular().causative_passive_negative || (this.base_form() + 'させられない')
		},

	causative_passive_masu_form:
		function()
		{
			return this.__irregular().causative_passive_masu || (this.base_form() + 'させられます')
		},

	causative_passive_masu_negative_form:
		function()
		{
			return this.__irregular().causative_passive_masu_negative || (this.base_form() + 'させられません')
		},

	volitional_form:
		function()
		{
			return this.__irregular().volitional || (this.base_form() + 'しよう')
		},

	volitional_negative_form:
		function()
		{
			return this.__irregular().volitional_negative || (this.base_form() + 'しまい')
		},

	volitional_masu_form:
		function()
		{
			return this.__irregular().volitional_masu || (this.base_form() + 'しましょう')
		},

	volitional_masu_negative_form:
		function()
		{
			return this.__irregular().volitional_masu_negative || (this.masu_form() + 'しますまい')
		},

	conditional_eba_form:
		function()
		{
			return this.__irregular().conditional_eba || (this.base_form() + 'すれば')
		},

	conditional_ra_form:
		function()
		{
			return this.plain_past_form() + 'ら'
		},

	potential_form:
		function()
		{
			return this.__irregular().potential || (this.base_form() + 'できる')
		}
})


Japanese.SuruVerb.IRREGULAR = {
	'する': {
		plain_negative: 'しない',
		te: 'して',
		te_negative: 'しないで',
		tai: 'したい',
		tai_negative: 'したくない',
		masu: 'します',
		masu_negative: 'しません',
		masu_past: 'しました',
		masu_past_negative: 'しませんでした',
		passive: 'さられる',
		causative: 'させる',
		causative_negative: 'させない',
		causative_masu: 'させます',
		causative_masu_negative: 'させません',
		causative_passive: 'させられる',
		causative_passive_negative: 'させられない',
		causative_passive_masu: 'させられます',
		causative_passive_masu_negative: 'させられません',
		volitional: 'しよう',
		volitional_negative: 'しまい',
		volitional_masu: 'しましょう',
		volitional_masu_negative: 'しますまい',
		conditional_eba: 'すれば',
		conditional_ra: 'したら',
		potential: 'できる'
	}
}

