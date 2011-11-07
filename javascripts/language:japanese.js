/**
 * (C) 2009 Daleki-Wschod.pl
 * (C) Michał „mcv” Gawron
 * TODO The なければ nakereba form used for the negative form can be colloquially contracted to なきゃ nakya or なくちゃ nakucha. Thus 行かなければ ikanakereba can become 行かなきゃ ikanakya.
 * TODO fix causative suru (suraseru) -> saseru
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
Japanese.MissingMethod = Class.create (Exception, {})


/**
 * Word
 */


Japanese.Word = Class.create ({
	/**
	 * Wraps methods with given names + "_form" with
	 * function that first checks if there is irregular
	 * word for the form. Otherwise calls old method.
	 */
	irregulars:
		function (forms)
		{
			forms.each (function (form) {
				var fun = this[form + '_form']
				if (!fun)
					throw new Japanese.MissingMethod ('missing method #{method} for form #{form}'.interpolate ({
						method: form + '_form', form: form
					}))
				this[form + '_form'] = function() {
					return this.__irregular()[form] || fun.bind (this)()
				}.bind (this)
			}.bind (this))
		}
})


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
		},

	hiraganize:
		function (roomaji, options)
		{
			Object.extend (
				options || {},
				Object.extend ({
					reduced: 0,
					cursor_position: 0,
					leave_trailing_n: false
				}, options || {})
			)

			var ret = ''

			var p = 0;
			var N = roomaji.length
			repl2 = $H ({
				'ja': 'じゃ',
				'ji': 'じ',
				'ju': 'じゅ',
				'jo': 'じょ'
			})
			repl3 = $H ({
				'tsu': 'つ',
				'sha': 'しゃ',
				'shi': 'し',
				'shu': 'しゅ',
				'sho': 'しょ',
				'cha': 'ちゃ',
				'chi': 'ち',
				'chu': 'ちゅ',
				'cho': 'ちょ'
			})

			var reduce = function (num) {
				if (p < options.cursor_position)
					options.reduced += num
			}

			while (roomaji[p] != undefined)
			{
				var c0 = roomaji[p + 0]
				var c1 = roomaji[p + 1]
				var c2 = roomaji[p + 2]
				var c3 = roomaji[p + 3]

				if (Japanese.Hiragana.TABLE1[''][c0])
				{
					ret += Japanese.Hiragana.TABLE1[''][c0]
					p += 1
				}
				else if (repl3.keys().include (roomaji.substr (p, 3)))
				{
					var v = repl3.get (roomaji.substr (p, 3))
					ret += v
					reduce (3 - v.length)
					p += 3
				}
				else if (repl2.keys().include (roomaji.substr (p, 2)))
				{
					var v = repl2.get (roomaji.substr (p, 2))
					ret += v
					reduce (2 - v.length)
					p += 3
				}
				else if (c0 == c1 && repl3.keys().include (roomaji.substr (p + 1, 3)))
				{
					var v = repl3.get (roomaji.substr (p + 1, 3))
					ret += 'っ' + v
					reduce (3 - v.length)
					p += 4
				}
				else if (Japanese.Hiragana.TABLE1[c0] && c1 == 'y' && ['a', 'u', 'o'].include (c2))
				{
					ret += Japanese.Hiragana.TABLE1[c0].i + ['ゃ', 'ゅ', 'ょ'][['a', 'u', 'o'].indexOf (c2)]
					reduce (1)
					p += 3
				}
				else if (c0 == 'n' && (c1 == undefined || Japanese.Hiragana.TABLE1[c1]))
				{
					if (!options.leave_trailing_n || (c1 && c1 != 'y'))
					{
						if (c1 == 'n')
						{
							p += 1
							reduce (1)
						}
						ret += 'ん'
					}
					else
						ret += 'n'
					p += 1
				}
				else if (Japanese.Hiragana.TABLE1[c0] || c0 == 'c')
				{
					// っ-repeat
					if (c0 == c1 && Japanese.Hiragana.TABLE1[c1][c2])
					{
						ret += 'っ' + Japanese.Hiragana.TABLE1[c1][c2]
						reduce (1)
						p += 3
					}
					else if (Japanese.Hiragana.TABLE1[c0] && Japanese.Hiragana.TABLE1[c0][c1])
					{
						ret += Japanese.Hiragana.TABLE1[c0][c1]
						reduce (1)
						p += 2
					}
					else
					{
						ret += c0
						p += 1
					}
				}
				else
				{
					ret += c0
					p += 1
				}
			}

			return ret
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

	teiru_negative_form:
		function()
		{
			return this.te_form() + 'いない'
		},

	teimasu_form:
		function()
		{
			return this.te_form() + 'います'
		},

	teimasu_negative_form:
		function()
		{
			return this.te_form() + 'いません'
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
	imperative_form: null,
	imperative_negative_form: null,
	imperative_masu_form: null,
	imperative_masu_negative_form: null,
	conditional_ba_form: null,
	conditional_ba_negative_form: null,
	conditional_ra_form: null,
	conditional_ra_negative_form: null,
	potential_form: null,
	potential_negative_form: null,
	imperative_1_form: null,
	imperative_1_negative_form: null,
	imperative_2_form: null,
	imperative_2_negative_form: null,

	honorific_form: function() { return '–' },
	humble_form: function() { return '–' },
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
			this.irregulars ([
				'plain_negative', 'plain_past_negative', 'te', 'te_negative', 'te_negative_2', 'tai', 'tai_negative',
				'masu', 'masu_negative', 'masu_past', 'masu_past_negative', 'passive', 'passive_negative',
				'causative', 'causative_negative', 'causative_masu', 'causative_masu_negative', 'causative_passive',
				'causative_passive_negative', 'causative_passive_masu', 'causative_passive_masu_negative',
				'volitional', 'volitional_negative', 'volitional_masu', 'volitional_masu_negative',
				'imperative', 'imperative_negative', 'imperative_masu', 'imperative_masu_negative',
				'conditional_ba', 'conditional_ba_negative', 'conditional_ra', 'conditional_ra_negative',
				'potential', 'potential_negative'
			])
		},

	plain_negative_form:					function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'ない' },
	plain_past_negative_form:				function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'なかった' },
	te_form:								function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].te },
	te_negative_form:						function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'ないで' },
	te_negative_2_form:						function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'なくて' },
	tai_form:								function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].i + 'たい' },
	tai_negative_form:						function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].i + 'たくない' },
	masu_form:								function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].ma + 'す' },
	masu_negative_form:						function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].ma + 'せん' },
	masu_past_form:							function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].ma + 'した' },
	masu_past_negative_form:				function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].ma + 'せんでした' },
	passive_form:							function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'れる' },
	passive_negative_form:					function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'れない' },
	causative_form:							function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'せる' },
	causative_negative_form:				function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'せない' },
	causative_masu_form:					function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'せます' },
	causative_masu_negative_form:			function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'せません' },
	causative_passive_form:					function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'せられる' },
	causative_passive_negative_form:		function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'せられない' },
	causative_passive_masu_form:			function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'せられます' },
	causative_passive_masu_negative_form:	function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'せられません' },
	volitional_form:						function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].ou },
	volitional_negative_form:				function() { return this.plain_form() + 'まい' },
	volitional_masu_form:					function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].i + 'ましょう' },
	volitional_masu_negative_form:			function() { return this.masu_form() + 'まい' },
	imperative_form:						function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].e },
	imperative_negative_form:				function() { return this.plain_form() + 'な' },
	imperative_masu_form:					function() { return this.te_form() + ' ください' },
	imperative_masu_negative_form:			function() { return this.te_negative_form() + ' ください' },
	conditional_ba_form:					function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].e + 'ば' },
	conditional_ba_negative_form:			function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].a + 'なければ' },
	conditional_ra_form:					function() { return this.plain_past_form() + 'ら' },
	conditional_ra_negative_form:			function() { return this.plain_past_negative_form() + 'ら' },
	potential_form:							function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].e + 'る' },
	potential_negative_form:				function() { return this.base_form() + Japanese.UVerb.MAPPINGS[this.ending].e + 'ない' }
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
		plain_past_negative: 'なかった',
		potential: 'ありえる',
		potential_negative: 'ありえない' // TODO upewnij się, że tak jest w istocie
	},
	'いらっしゃる': {
		te: 'いらっしゃって',
		masu: 'いらっしゃいます',
		masu_negative: 'いらっしゃいません',
		masu_past: 'いらっしゃいました',
		masu_past_negative: 'いらっしゃいませんでした'
	},
	'なさる': {
		te: 'なさって',
		masu: 'なさいます',
		masu_negative: 'なさいません',
		masu_past: 'なさいました',
		masu_past_negative: 'なさいませんでした'
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
			this.irregulars ([
				'plain_negative', 'plain_past_negative', 'te', 'te_negative', 'te_negative_2', 'tai', 'tai_negative',
				'masu', 'masu_negative', 'masu_past', 'masu_past_negative', 'passive', 'passive_negative',
				'causative', 'causative_negative', 'causative_masu', 'causative_masu_negative', 'causative_passive',
				'causative_passive_negative', 'causative_passive_masu', 'causative_passive_masu_negative',
				'volitional', 'volitional_negative', 'volitional_masu', 'volitional_masu_negative',
				'imperative', 'imperative_negative', 'imperative_masu', 'imperative_masu_negative',
				'conditional_ba', 'conditional_ba_negative', 'conditional_ra', 'conditional_ra_negative',
				'potential', 'potential_negative'
			])
		},

	plain_negative_form:					function() { return this.base_form() + 'ない' },
	plain_past_negative_form:				function() { return this.base_form() + 'なかった' },
	te_form:								function() { return this.base_form() + 'て' },
	te_negative_form:						function() { return this.base_form() + 'ないで' },
	te_negative_2_form:						function() { return this.base_form() + 'なくて' },
	tai_form:								function() { return this.base_form() + 'たい' },
	tai_negative_form:						function() { return this.base_form() + 'たくない' },
	masu_form:								function() { return this.base_form() + 'ます' },
	masu_negative_form:						function() { return this.base_form() + 'ません' },
	masu_past_form:							function() { return this.base_form() + 'ました' },
	masu_past_negative_form:				function() { return this.base_form() + 'ませんでした' },
	passive_form:							function() { return this.base_form() + 'られる' },
	passive_negative_form:					function() { return this.base_form() + 'られない' },
	causative_form:							function() { return this.base_form() + 'させる' },
	causative_negative_form:				function() { return this.base_form() + 'させない' },
	causative_masu_form:					function() { return this.base_form() + 'させます' },
	causative_masu_negative_form:			function() { return this.base_form() + 'させません' },
	causative_passive_form:					function() { return this.base_form() + 'させられる' },
	causative_passive_negative_form:		function() { return this.base_form() + 'させられない' },
	causative_passive_masu_form:			function() { return this.base_form() + 'させられます' },
	causative_passive_masu_negative_form:	function() { return this.base_form() + 'させられません' },
	volitional_form:						function() { return this.base_form() + 'よう' },
	volitional_negative_form:				function() { return this.base_form() + 'まい' },
	volitional_masu_form:					function() { return this.base_form() + 'ましょう' },
	volitional_masu_negative_form:			function() { return this.masu_form() + 'まい' },
	imperative_form:						function() { return this.base_form() + 'れ' },
	imperative_negative_form:				function() { return this.plain_form() + 'な' },
	imperative_masu_form:					function() { return this.te_form() + ' ください' },
	imperative_masu_negative_form:			function() { return this.te_negative_form() + ' ください' },
	conditional_ba_form:					function() { return this.base_form() + 'れば' },
	conditional_ba_negative_form:			function() { return this.base_form() + 'なければ' },
	conditional_ra_form:					function() { return this.plain_past_form() + 'ら' },
	conditional_ra_negative_form:			function() { return this.base_form() + 'なかったら' },
	potential_form:							function() { return this.base_form() + 'られる' }, // TODO czy ru-czasowniki w ogóle mają formę potencjalną?
	potential_negative_form:				function() { return this.base_form() + 'られない' }
})


Japanese.RuVerb.IRREGULAR = {
	'くる': {
		plain_negative: 'こない',
		plain_past_negative: 'こなかった',
		te: 'きて',
		te_negative: 'こないで',
		te_negative_2: 'こなくて',
		tai: 'きたい',
		tai_negative: 'きたくない',
		masu: 'きます',
		masu_negative: 'きません',
		masu_past: 'きました',
		masu_past_negative: 'きませんでした',
		passive: 'こられる',
		passive_negative: 'こられない',
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
		imperative_form: 'くれ', // TODO tadashii no desu ka...
		imperative_negative_form: '', // TODO kamosirene...
		conditional_ba: 'くれば',
		conditional_ba_negative: 'くれなければ',
		conditional_ra: 'きたら',
		conditional_ra_negative: 'くれなかったら',
		potential: 'こられる',
		potential_negative: 'こられない'
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
			this.irregulars ([
				'te', 'te_negative', 'tai', 'tai_negative', 'masu', 'masu_negative', 'masu_past',
				'masu_past_negative', 'passive', 'passive_negative', 'causative', 'causative_negative', 'causative_masu',
				'causative_masu_negative', 'causative_passive', 'causative_passive_negative',
				'causative_passive_masu', 'causative_passive_masu_negative', 'volitional',
				'volitional_negative', 'volitional_masu', 'volitional_masu_negative',
				'imperative', 'imperative_negative', 'imperative_masu', 'imperative_masu_negative',
				'conditional_ba', 'conditional_ba_negative', 'conditional_ra', 'conditional_ra_negative',
				'potential', 'potential_negative'
			])
		},

	plain_negative_form:
		function()
		{
			return this.__irregular().plain_negative || (this.base_form() + 'しない')
		},

	te_form:								function() { return this.base_form() + 'して' },
	te_negative_form:						function() { return this.base_form() + 'しないで' },
	te_negative_2_form:						function() { return this.base_form() + 'しなくて' },
	tai_form:								function() { return this.base_form() + 'したい' },
	tai_negative_form:						function() { return this.base_form() + 'したくない' },
	masu_form:								function() { return this.base_form() + 'します' },
	masu_negative_form:						function() { return this.base_form() + 'しません' },
	masu_past_form:							function() { return this.base_form() + 'しました' },
	masu_past_negative_form:				function() { return this.base_form() + 'しませんでした' },
	passive_form:							function() { return this.base_form() + 'される' },
	passive_negative_form:					function() { return this.base_form() + 'されない' },
	causative_form:							function() { return this.base_form() + 'させる' },
	causative_negative_form:				function() { return this.base_form() + 'させない' },
	causative_masu_form:					function() { return this.base_form() + 'させます' },
	causative_masu_negative_form:			function() { return this.base_form() + 'させません' },
	causative_passive_form:					function() { return this.base_form() + 'させられる' },
	causative_passive_negative_form:		function() { return this.base_form() + 'させられない' },
	causative_passive_masu_form:			function() { return this.base_form() + 'させられます' },
	causative_passive_masu_negative_form:	function() { return this.base_form() + 'させられません' },
	volitional_form:						function() { return this.base_form() + 'しよう' },
	volitional_negative_form:				function() { return this.base_form() + 'しまい' },
	volitional_masu_form:					function() { return this.base_form() + 'しましょう' },
	volitional_masu_negative_form:			function() { return this.masu_form() + 'しますまい' },
	imperative_form:						function() { return this.base_form() + 'しれ' },
	imperative_negative_form:				function() { return this.plain_form() + 'な' },
	imperative_masu_form:					function() { return this.te_form() + ' ください' },
	imperative_masu_negative_form:			function() { return this.te_negative_form() + ' ください' },
	conditional_ba_form:					function() { return this.base_form() + 'すれば' },
	conditional_ba_negative_form:			function() { return this.base_form() + 'しなければ' },
	conditional_ra_form:					function() { return this.plain_past_form() + 'ら' },
	conditional_ra_negative_form:			function() { return this.plain_past_form() + 'なかったら' },
	potential_form:							function() { return this.base_form() + 'できる' },
	potential_negative_form:				function() { return this.base_form() + 'できない' }
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
		passive: 'される',
		passive_negative: 'されない',
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
		conditional_ba: 'すれば',
		conditional_ba_negative: 'しなければ',
		conditional_ra: 'したら',
		conditional_ra_negative: 'しなかったら',
		potential: 'できる',
		potential_negative: 'できない'
	}
}


Japanese.AutoHiraganize = Class.create ({
	initialize:
		function (element)
		{
			this.element = $(element)
			this.element.observe ('keyup', this.process.bind (this))
			this.element.observe ('keypress', this.keypress.bind (this))
		},

	set:
		function (s)
		{
			this.element.value = s
			this.process()
		},

	keypress:
		function (event)
		{
			this.last_char_code = event.charCode
		},

	process:
		function (event)
		{
			if (this.last_char_code == 0)
				this.element.value = Japanese.Hiragana.hiraganize (this.element.value, {})
			else
			{
				var opt = {
					cursor_position: this.element.selectionStart,
					leave_trailing_n: true
				}
				this.element.value = Japanese.Hiragana.hiraganize (this.element.value, opt)
				this.element.selectionStart = this.element.selectionEnd = opt.cursor_position - opt.reduced
			}
		}
})

