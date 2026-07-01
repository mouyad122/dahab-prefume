/**
 * ====================================================================
 * LEGACY MOCK DATA ONLY.
 * Do not use as the product source of truth.
 * Official product source is the database through ProductDbService and /api/products routes.
 * Frontend must use docs/backend-product-contract.md and /api/products endpoints.
 * ====================================================================
 */

export const initialProducts = [
  {
    id: 'hair-mist-vanilla',
    slug: 'musk-vanilla-hair-mist',
    sku: 'DAHAB-HM-VN01',
    title: {
      ar: 'هيرميست مسك فانيلا',
      en: 'Musk Vanilla Hair Mist'
    },
    price: 18.00,
    compareAtPrice: 22.00,
    volume: '50ml',
    category: 'hair-mists',
    collection: 'hair-mists',
    stock: 12,
    hidden: false,
    archived: false,
    thumbnail: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=600',
    shortDescription: {
      ar: 'معطر شعر فاخر بمزيج مغذٍ من زيت الأرجان وزيت جوز الهند برائحة الفانيليا والمسك.',
      en: 'Premium hair mist enriched with Argan and Coconut oils, scented with sweet Vanilla and Musk.'
    },
    longDescription: {
      ar: 'يرغب الجميع في الاحتفاظ برائحة جذابة للشعر تدوم طويلاً، وذلك أصبح سهلاً مع هيرميست مسك فانيلا من دهب للعطور. تركيبتنا الخاصة غنية بزيت الأرجان وزيت جوز الهند المغذي لحماية خصل الشعر وترطيبها.',
      en: 'Keep your hair smelling attractive all day long with Musk Vanilla Hair Mist. Formulated with Argan oil and Coconut oil to nourish, protect, and add shine.'
    },
    fragranceNotes: {
      top: ['الفانيليا / Vanilla', 'البرغموت / Bergamot'],
      heart: ['الأوركيد / Orchid', 'الورد / Rose'],
      base: ['المسك / Musk', 'جوز الهند / Coconut']
    },
    metrics: {
      longevity: 'long_lasting',
      sillage: 'moderate',
      bestSeason: ['spring', 'summer', 'autumn', 'winter'],
      bestTime: 'all_day'
    }
  },
  {
    id: 'hair-mist-pomegranate',
    slug: 'musk-pomegranate-hair-mist',
    sku: 'DAHAB-HM-PM02',
    title: {
      ar: 'هيرميست مسك رمان',
      en: 'Musk Pomegranate Hair Mist'
    },
    price: 18.00,
    volume: '50ml',
    category: 'hair-mists',
    collection: 'hair-mists',
    stock: 8,
    hidden: false,
    archived: false,
    thumbnail: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600',
    shortDescription: {
      ar: 'عطر للشعر برائحة الرمان المنعشة والمسك الفاخر مع زيوت الأرجان الطبيعية.',
      en: 'Fruity and fresh pomegranate blended with premium musk and hair nourishing oils.'
    },
    longDescription: {
      ar: 'هيرميست مسك رمان يمنح شعرك حيوية لا مثيل لها بفضل نفحات الرمان الفاكهية المنعشة الممزوجة بالمسك النقي.',
      en: 'Musk Pomegranate Hair Mist gives your hair unmatched vitality with fresh fruity pomegranate notes blended with pure musk.'
    },
    fragranceNotes: {
      top: ['الرمان / Pomegranate', 'التوت / Berries'],
      heart: ['الياسمين / Jasmine', 'الورد الجوري / Rose'],
      base: ['المسك / Musk', 'العنبر / Amber']
    },
    metrics: {
      longevity: 'long_lasting',
      sillage: 'moderate',
      bestSeason: ['spring', 'summer'],
      bestTime: 'day'
    }
  },
  {
    id: 'hair-mist-jasmine',
    slug: 'musk-jasmine-hair-mist',
    sku: 'DAHAB-HM-JS03',
    title: {
      ar: 'هيرميست مسك ياسمين',
      en: 'Musk Jasmine Hair Mist'
    },
    price: 18.00,
    volume: '50ml',
    category: 'hair-mists',
    collection: 'hair-mists',
    stock: 15,
    hidden: false,
    archived: false,
    thumbnail: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600',
    shortDescription: {
      ar: 'عبير الياسمين الشرقي الفواح مع مسك دهب النقي لحماية وتعطير الشعر.',
      en: 'Rich oriental jasmine scent blended with white musk and organic hair oils.'
    },
    longDescription: {
      ar: 'استمتعي بنفحات الياسمين الساحرة التي تملأ شعرك عطراً وأنوثة. تركيبتنا المغذية بزيت الأرجان وزيت جوز الهند تضمن بقاء شعرك رطباً ولامعاً وخالياً من التجعد.',
      en: 'Enjoy the enchanting jasmine notes that fill your hair with elegance. Our nourishing formula with Argan and Coconut oils ensures your hair remains hydrated, shiny, and frizz-free.'
    },
    fragranceNotes: {
      top: ['الياسمين / Jasmine', 'زهر البرتقال / Orange Blossom'],
      heart: ['مسك الروم / Tuberose', 'الغاردينيا / Gardenia'],
      base: ['المسك / Musk', 'الصندل / Sandalwood']
    },
    metrics: {
      longevity: 'long_lasting',
      sillage: 'moderate',
      bestSeason: ['spring', 'summer', 'autumn'],
      bestTime: 'all_day'
    }
  },
  {
    id: 'hair-mist-powder',
    slug: 'musk-powder-hair-mist',
    sku: 'DAHAB-HM-PW04',
    title: {
      ar: 'هيرميست مسك باودر',
      en: 'Musk Powder Hair Mist'
    },
    price: 18.00,
    volume: '50ml',
    category: 'hair-mists',
    collection: 'hair-mists',
    stock: 5,
    hidden: false,
    archived: false,
    thumbnail: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600',
    shortDescription: {
      ar: 'رائحة النظافة والانتعاش مع هيرميست الباودر والمسك النقي وزيت الأرجان.',
      en: 'The ultimate clean and powdery scent blended with pure musk and argan oil.'
    },
    longDescription: {
      ar: 'لمحبي روائح النظافة والانتعاش الباردة، نقدم هيرميست مسك باودر. يمنح شعرك إحساساً منعشاً يشبه النظافة بعد الاستحمام.',
      en: 'For lovers of clean, fresh, and powdery scents, we offer Musk Powder Hair Mist. It gives your hair a fresh post-bath feeling.'
    },
    fragranceNotes: {
      top: ['الباودر / Powder', 'الألدهيدات / Aldehydes'],
      heart: ['السوسن / Iris', 'البنفسج / Violet'],
      base: ['المسك / Musk', 'الهيليوتروب / Heliotrope']
    },
    metrics: {
      longevity: 'long_lasting',
      sillage: 'soft',
      bestSeason: ['spring', 'summer'],
      bestTime: 'day'
    }
  },
  {
    id: 'hair-mist-dahab',
    slug: 'musk-dahab-hair-mist',
    sku: 'DAHAB-HM-DH05',
    title: {
      ar: 'هيرميست مسك دهب',
      en: 'Musk Dahab Hair Mist'
    },
    price: 20.00,
    volume: '50ml',
    category: 'hair-mists',
    collection: 'hair-mists',
    stock: 10,
    hidden: false,
    archived: false,
    thumbnail: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=600',
    shortDescription: {
      ar: 'العطر الخاص بهوية المحل، عبير شرقي فخم يجمع بين فخامة العود ودفء المسك الملكي.',
      en: 'The signature boutique scent, a luxurious oriental blend of oud and royal musk.'
    },
    longDescription: {
      ar: 'هيرميست مسك دهب هو فخر مجموعتنا والعطر الحصري الذي يعكس هوية متجر دهب للعطور. مزيج شرقي فخم وعميق يجمع بين فخامة دهن العود المعتدل وبتلات الورد.',
      en: 'Musk Dahab Hair Mist is our signature product reflecting the luxurious heritage of Dahab Perfumes. A deep oriental blend of smooth oud wood, soft roses, and a base of rich royal musk.'
    },
    fragranceNotes: {
      top: ['العود / Oud', 'الورد / Rose'],
      heart: ['التوابل / Spices', 'الباتشولي / Patchouli'],
      base: ['المسك / Musk', 'العنبر / Amber', 'الصندل / Sandalwood']
    },
    metrics: {
      longevity: 'eternal',
      sillage: 'heavy',
      bestSeason: ['autumn', 'winter'],
      bestTime: 'night'
    }
  },
  {
    id: 'private-eragon',
    slug: 'eragon-100ml',
    sku: 'DAHAB-PC-ER01',
    title: {
      ar: 'عطر إيراغون 100 مل',
      en: 'Eragon Perfume 100ml'
    },
    price: 45.00,
    compareAtPrice: 55.00,
    volume: '100ml',
    category: 'private-collection',
    collection: 'private-collection',
    stock: 3,
    hidden: false,
    archived: false,
    thumbnail: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600',
    shortDescription: {
      ar: 'من المجموعات الخاصة لدهب للعطور، عبير ملكي فخم بزجاجة ذهبية فريدة وغطاء رأس الحصان.',
      en: "From Dahab's Private Collection, a royal oriental masterpiece in a unique golden horse-head bottle."
    },
    longDescription: {
      ar: 'عطر إيراغون (Eragon) هو التحفة الفنية لمجموعتنا الخاصة المستوحاة من فخامة عطور ديمارلي الفرنسية. يأتي العطر في زجاجة ذهبية براقة مطلية بالكامل وغطاء على شكل رأس حصان من المعدن الثقيل.',
      en: 'Eragon is the masterpiece of our Private Collection inspired by the grandeur of French niche perfumery. Housed in a fully coated polished gold bottle with a heavy metallic horse-head cap.'
    },
    fragranceNotes: {
      top: ['القرفة / Cinnamon', 'الكزبرة / Coriander', 'الزعفران / Saffron'],
      heart: ['العسل / Honey', 'التبغ / Tobacco', 'الجلود / Leather'],
      base: ['العود / Oud', 'العنبر / Amber', 'الفانيليا / Vanilla', 'الباتشولي / Patchouli']
    },
    metrics: {
      longevity: 'eternal',
      sillage: 'heavy',
      bestSeason: ['autumn', 'winter'],
      bestTime: 'night'
    }
  },
  {
    id: 'lattafa-adeeb',
    slug: 'lattafa-adeeb-80ml',
    sku: 'LATTAFA-AD01',
    title: {
      ar: 'لطافة أديب 80 مل',
      en: 'Lattafa Adeeb 80ml'
    },
    price: 25.00,
    volume: '80ml',
    category: 'middle-eastern',
    collection: 'middle-eastern',
    stock: 4,
    hidden: false,
    archived: false,
    thumbnail: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600',
    shortDescription: {
      ar: 'عطر خشبي شرقي فاخر من دار لطافة الشهيرة يجمع التوابل والتبغ والخشب.',
      en: 'Luxurious woody oriental fragrance from Lattafa featuring spices, tobacco, and wood.'
    },
    longDescription: {
      ar: 'عطر أديب من دار لطافة هو تحفة عطرية تجمع بين التقاليد الشرقية والعصر الغربي. يفتتح العطر بنكهة التوابل والتبغ ليمهد الطريق لقلب غني بالخشب والصندل.',
      en: 'Adeeb by Lattafa is a rich fragrance that bridges Eastern traditions and Western elegance. Opening with spices and tobacco, leading to a heart of wood and sandalwood.'
    },
    fragranceNotes: {
      top: ['القرفة / Cinnamon', 'التبغ / Tobacco', 'القرنفل / Cloves'],
      heart: ['الصندل / Sandalwood', 'الأرز / Cedarwood', 'الهيل / Cardamom'],
      base: ['المسك / Musk', 'الجلد / Leather', 'البخور / Incense', 'الباتشولي / Patchouli']
    },
    metrics: {
      longevity: 'long_lasting',
      sillage: 'heavy',
      bestSeason: ['autumn', 'winter'],
      bestTime: 'night'
    }
  },
  {
    id: 'lattafa-qaaed',
    slug: 'lattafa-qaaed-100ml',
    sku: 'LATTAFA-QA02',
    title: {
      ar: 'لطافة قائد 100 مل',
      en: 'Lattafa Qa\'aed 100ml'
    },
    price: 22.00,
    volume: '100ml',
    category: 'middle-eastern',
    collection: 'middle-eastern',
    stock: 6,
    hidden: false,
    archived: false,
    thumbnail: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600',
    shortDescription: {
      ar: 'عطر التوابل الحارة والجلود والعود في زجاجة ذهبية فاخرة من دار لطافة.',
      en: 'Spicy, leather, and oud blend in a stunning gold textured bottle by Lattafa.'
    },
    longDescription: {
      ar: 'قائد من لطافة هو عطر دافئ وتوابلي حار يفتتح بنفحات الهيل والقرفة. قلب العطر يحتوي على مزيج من الزعفران والقرنفل والجلود بينما تنتهي القاعدة بروائح العود والعنبر والفانيليا.',
      en: 'Qa\'aed by Lattafa is a warm and spicy fragrance opening with cardamom and cinnamon. The heart is filled with saffron, cloves, and leather, while the base contains oud, amber, and vanilla.'
    },
    fragranceNotes: {
      top: ['الهيل / Cardamom', 'القرفة / Cinnamon', 'البرغموت / Bergamot'],
      heart: ['الزعفران / Saffron', 'القرنفل / Cloves', 'الجلود / Leather'],
      base: ['العود / Oud', 'العنبر / Amber', 'الفانيليا / Vanilla', 'الصندل / Sandalwood']
    },
    metrics: {
      longevity: 'long_lasting',
      sillage: 'heavy',
      bestSeason: ['autumn', 'winter'],
      bestTime: 'night'
    }
  },
  {
    id: 'arabian-oud-kalemat',
    slug: 'arabian-oud-kalemat-100ml',
    sku: 'ARABIAN-KL01',
    title: {
      ar: 'العربية للعود كلمات 100 مل',
      en: 'Arabian Oud Kalemat 100ml'
    },
    price: 35.00,
    compareAtPrice: 42.00,
    volume: '100ml',
    category: 'middle-eastern',
    collection: 'middle-eastern',
    stock: 5,
    hidden: false,
    archived: false,
    thumbnail: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=600',
    shortDescription: {
      ar: 'العطر الحائز على جوائز عالمية، مزيج ساحر من العسل والعنبر والتوت البري.',
      en: 'Award-winning legendary fragrance blending rich honey, amber, and blueberries.'
    },
    longDescription: {
      ar: 'عطر كلمات الشهير من دار العربية للعود هو رمز للفخامة العربية المعاصرة وحائز على عدة جوائز عالمية. يتميز برائحته الفريدة الدافئة التي تجمع بين عسل النحل والتواريخ المجففة والتوت البري في الافتتاحية.',
      en: 'Kalemat by Arabian Oud is an award-winning scent and a symbol of modern Arabic luxury. Known for its unique warm aroma blending wild honey, blueberries, and rosemary, settling into cashmere wood, amber, and rich tobacco leaves.'
    },
    fragranceNotes: {
      top: ['التوت / Blueberries', 'العسل / Honey', 'اليانسون / Anise'],
      heart: ['الكشمير / Cashmere Wood', 'إكليل الجبل / Rosemary', 'الأخشاب / Scented Woods'],
      base: ['العنبر / Amber', 'التبغ / Tobacco', 'المسك / Musk']
    },
    metrics: {
      longevity: 'eternal',
      sillage: 'heavy',
      bestSeason: ['autumn', 'winter'],
      bestTime: 'all_day'
    }
  }
];
