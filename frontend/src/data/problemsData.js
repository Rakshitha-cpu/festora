// FESTORA: WISDOM OS — MASTER PROBLEM & CULTURAL TECHNOLOGY DATABASE
// Organizing principle: Universal Human Challenges -> Immersive Scenarios -> Biological Mechanisms -> Modern Protocols

export const PROBLEM_CATEGORIES = [
  {
    id: "seasonal-burnout",
    title: "Seasonal Depression & Year-End Burnout",
    shortDesc: "Winter lethargy, circadian fatigue, and the deep dread of entering a new cycle depleted.",
    badge: "Circadian & Temporal Deficit",
    iconName: "Sun",
    accentColor: "#d4a359", // Gold
    glowClass: "glow-gold",
    symptoms: ["Morning paralysis", "Cold-season apathy", "Dread of new calendar year", "Loss of creative vitality"],
    intensityLevel: 8,
    historicalContext: {
      era: "North Indian Agrarian Communities (c. 1840 CE)",
      location: "Indo-Gangetic Plain",
      scale: "Affected entire agrarian populations facing barren post-harvest winter voids."
    },
    character: {
      id: "devraj",
      name: "Devraj",
      role: "Agrarian Elder & Farmer",
      avatarImage: "🌾",
      backstory: "November 1840. The harvest is locked away in granaries. For the first time in 7 months, the fields are dead silent and brown. Devraj wakes before dawn shivering, terrified that the food will not last and that his inner flame has died.",
      scenarios: [
        {
          stage: 1,
          prompt: "Devraj stands at the ridge overlooking his barren field in the November fog. His hands are cracked from the chill, his chest tight with unspoken dread.",
          dialogue: "The earth is asleep, or perhaps dead. When there is no soil to plow, the mind turns upon itself like a wild dog. My sons look to me for strength, but inside I feel as cold as the morning frost. How do you face a season where nothing moves?",
          choices: [
            {
              id: "c1_1",
              text: "Ask Devraj: 'Is it the lack of harvest work, or fear of the winter freeze that weighs on you?'",
              consequence: "Devraj exhales a plume of white vapor. 'Both. In summer, labor distracts the soul. In winter, the silence forces you to face what you have avoided. Without a ritual to reset our minds, whole villages succumb to bitter silence.'",
              moodShift: "Deeper Emotional Awareness"
            },
            {
              id: "c1_2",
              text: "Suggest: 'Can you force yourself to work on something else to stay busy?'",
              consequence: "Devraj shakes his head gently. 'You cannot fight winter with forced frantic action. The trees do not force blossoms in frost. The ancestors taught us: you must pivot with the Sun, not resist the dark.'",
              moodShift: "Shift to Cyclical Understanding"
            }
          ]
        },
        {
          stage: 2,
          prompt: "The village council gathers around the small morning fire as the winter solstice approaches (Makar Sankranti / Uttarayan).",
          dialogue: "We are preparing for the transition. We will gather sesame seeds and unrefined jaggery (Til-Gud). We will fly vibrant paper kites into the winter sky, not as a toy, but to force our faces and retinas toward the ascending northern sun. Will you stand with us?",
          choices: [
            {
              id: "c2_1",
              text: "'Why sesame seeds and kites? It seems so simple for such deep despair.'",
              consequence: "Devraj smiles. 'Sesame heats the cold blood with vital fats; staring at the kites in the winter sky floods the optic nerve with the dawn light we starve for in our huts. And when we give Til-Gud, the rule is: 'Speak only sweetness.' It mends every petty grudge from the previous year.'",
              moodShift: "Discovery of Biological & Social Ingenuity"
            },
            {
              id: "c2_2",
              text: "'How does the community hold together when everyone is struggling?'",
              consequence: "Devraj places a warm clay cup in your hands. 'Because the ritual is synchronized. When one man is isolated, he freezes. When three hundred climb to the rooftops at dawn together, the collective roar dissolves the winter ghost.'",
              moodShift: "Somatic Social Buffering"
            }
          ]
        }
      ]
    },
    culturalSolution: {
      name: "Makar Sankranti & Uttarayan Solar Protocol",
      region: "Pan-Indian (Sankranti, Pongal, Lohri, Bihu)",
      corePrinciple: "Conscious Solar Attunement & Thermogenic Social Reset",
      evolution: "Evolved over 3,000 years to prevent seasonal affective disorder (SAD), replenish depleted lipids, and create a hard temporal landmark between the old cycle and the new.",
      mechanisms: [
        {
          title: "Circadian Photobiomodulation",
          category: "Neurobiology",
          detail: "Morning solar viewing (retinal melanopsin stimulation) synchronizes the suprachiasmatic nucleus (SCN), elevates dopamine synthesis, and re-anchors the diurnal cortisol spike.",
          citation: "Roecklein et al., Am J Psychiatry (2021); Huberman et al., Cell Reports (2022)"
        },
        {
          title: "Temporal Landmark Effect",
          category: "Cognitive Psychology",
          detail: "Creating a formal boundary ritual between cycles provides psychological closure on past failures and triggers the 'Fresh Start Effect', boosting executive motivation.",
          citation: "Dai, Milkman, & Riis, Management Science (2014)"
        },
        {
          title: "Lipid & Thermogenic Restoration",
          category: "Somatic Biology",
          detail: "Sesame (Sesamum indicum) and jaggery deliver high-density sesamin and iron, supporting mitochondrial thermogenesis in cold weather.",
          citation: "Majdalawieh & Ro, Eur J Nutr (2015)"
        },
        {
          title: "Collective Effervescence",
          category: "Sociology",
          detail: "Synchronized gaze and rooftop kite festival creates collective spatial expansion, breaking claustrophobic winter isolation.",
          citation: "Durkheim, Elementary Forms of Religious Life; Dunbar, Oxford Social Neuroscience"
        }
      ]
    },
    protocols: {
      solo: {
        title: "12-Minute Dawn Solar Attunement",
        timeNeeded: "12 mins",
        bestTime: "Within 60 minutes of sunrise",
        sensoryAnchor: "Warm water + pinch of roasted sesame or sesame oil on pulse points",
        steps: [
          "Step outside or face an open east-facing window without sunglasses.",
          "Gaze toward the horizon/dawn sky for 8 minutes while practicing Box Breathing (4s Inhale, 4s Hold, 4s Exhale, 4s Hold).",
          "Consume 1 tsp of roasted sesame seeds or dark honey/jaggery mindfully.",
          "Write 3 past-cycle burdens to formally archive and 1 intentional focus for this solar quadrant."
        ]
      },
      partner: {
        title: "Til-Gud Sweetness Covenant",
        timeNeeded: "15 mins",
        bestTime: "Early evening",
        steps: [
          "Sit facing each other with a small warm food item.",
          "Exchange the piece with the ancient phrase: 'Take this sweet, and let us speak only what builds each other up.'",
          "Take turns answering: 'What is one cold fear you are carrying into this new season?'",
          "Acknowledge without giving unsolicited advice; close with a bilateral 3-breath synchronization."
        ]
      },
      smallCircle: {
        title: "Winter Hearth Crucible (3-8 People)",
        timeNeeded: "45 mins",
        bestTime: "Weekend sunset",
        steps: [
          "Gather around a central candle or outdoor small fire.",
          "Prepare a warm pot of spiced grain (Pongal/Khichdi).",
          "Each participant writes one completed struggle on paper and feeds it to the flame.",
          "Share the warm food in complete silence for the first 5 minutes to ground the autonomic nervous system."
        ]
      },
      community: {
        title: "Global Synchronized Solstice Pulse",
        timeNeeded: "10 mins",
        bestTime: "Global 07:00 AM local time",
        steps: [
          "Connect to the live Wisdom OS Community Pulse stream.",
          "Contribute your anonymous mood check-in to the collective dashboard.",
          "Join the simultaneous 10-minute Trataka / Solar breath room with 3,000+ practitioners worldwide."
        ]
      }
    }
  },
  {
    id: "digital-isolation",
    title: "Digital Isolation & Loss of Collective Belonging",
    shortDesc: "Hyper-connected on screens yet profoundly lonely, touch-starved, and detached from physical community.",
    badge: "Social Buffering Deficit",
    iconName: "Users",
    accentColor: "#10b981", // Emerald
    glowClass: "glow-emerald",
    symptoms: ["Parasocial exhaustion", "Phone addiction as loneliness shield", "Social anxiety in real gatherings", "Absence of deep tribal trust"],
    intensityLevel: 9,
    historicalContext: {
      era: "Travancore Coastal Communities & Western India (c. 1750 CE)",
      location: "Kerala & Gujarat",
      scale: "Post-famine social fracture resolved through synchronized community architecture."
    },
    character: {
      id: "kalyani",
      name: "Kalyani",
      role: "Community Weaver & Elder",
      avatarImage: "🌿",
      backstory: "Travancore, 1750. Following a devastating flood season, households had barricaded themselves, suspicious of their neighbors. Kalyani remembers how the Onam harvest Sadya forced estranged clans to sit shoulder-to-shoulder on long plantain leaves.",
      scenarios: [
        {
          stage: 1,
          prompt: "Kalyani watches villagers walking with downcast eyes, each hoarding their meager grain behind locked wooden gates.",
          dialogue: "When hunger and mistrust spread, humans hide in their caves. But a human alone in a cave becomes fragile and paranoid. You modern people have built digital caves where you talk to ghosts across glowing glass. Are you truly safe in there?",
          choices: [
            {
              id: "c1_1",
              text: "'We feel connected online, but we have no one to call when we are in crisis.'",
              consequence: "Kalyani nods sorrowfully. 'A screen cannot share body heat. It cannot synchronize your heartbeat with another. You need physical ritual where bodies share space, food, and rhythm.'",
              moodShift: "Recognition of Somatic Deficit"
            },
            {
              id: "c1_2",
              text: "'Social gatherings feel overwhelming and drain my social battery.'",
              consequence: "Kalyani smiles gently. 'That is because your modern parties demand performance and status! Our festivals had rules: you do not perform. You hold the same step in Garba, or you eat the same rice from the same leaf. The ritual protects the introvert.'",
              moodShift: "Reframing Ritual as Social Protection"
            }
          ]
        },
        {
          stage: 2,
          prompt: "The village square is cleared for the 9-night Navratri circle and the Onam community banquet.",
          dialogue: "Look at the circle forming. No one is the star. When four hundred people clap and turn at the exact same beat for two hours, something miraculous happens: the ego dissolves, and the tribe breathes as one organism.",
          choices: [
            {
              id: "c2_1",
              text: "'What is the science of why rhythmic dance makes strangers feel like kin?'",
              consequence: "Kalyani points to the synchronized dancers: 'When you match another person's rhythm, your brain ceases to see them as a threat. The nervous system drops its guard. In your language: you are flooded with oxytocin and beta-endorphins.'",
              moodShift: "Scientific Integration"
            },
            {
              id: "c2_2",
              text: "'How can I bring this into my modern life in a high-rise apartment?'",
              consequence: "Kalyani hands you a bundle of jasmine and fresh spices: 'Start with three people. Do not host a vanity dinner. Host a collaborative preparation ritual where everyone chops, stirs, and cleans together.'",
              moodShift: "Actionable Modern Strategy"
            }
          ]
        }
      ]
    },
    culturalSolution: {
      name: "Navratri Kinetic Entrainment & Onam Sadya Protocol",
      region: "Gujarat, Kerala, pan-diaspora",
      corePrinciple: "Radical Egalitarian Co-Presence & Motor Synchrony",
      evolution: "Refined across millennia to dissolve hierarchical social anxiety and establish unconditional baseline belonging.",
      mechanisms: [
        {
          title: "Endorphin-Oxytocin Motor Entrainment",
          category: "Social Neuroscience",
          detail: "Synchronized group movement (clapping, circular stepping in Garba) triggers massive endogenous opioid release, fostering rapid pro-social bonding.",
          citation: "Tarr, Launay, & Dunbar, Evolution and Human Behavior (2016)"
        },
        {
          title: "Polyvagal Social Engagement System",
          category: "Autonomic Physiology",
          detail: "Shared meals without competitive signaling down-regulate dorsal vagal shutdown and ventral vagal safety cues.",
          citation: "Porges, S., The Polyvagal Theory (2011)"
        },
        {
          title: "Suppression of Social Threat Vigilance",
          category: "Cognitive Psychology",
          detail: "Predictable, script-based ritual actions reduce executive load and remove the cognitive dread of awkward social improvisation.",
          citation: "Hobson et al., Trends in Cognitive Sciences (2018)"
        }
      ]
    },
    protocols: {
      solo: {
        title: "Relational Mapping & Audio-Synchrony Anchor",
        timeNeeded: "15 mins",
        bestTime: "Evening",
        sensoryAnchor: "Jasmine aroma or sandalwood mist",
        steps: [
          "Put on binaural/rhythmic soundscape (60-80 BPM).",
          "Draw 3 concentric circles on paper: Core Anchors (intimate), Tribe (close friends), Extended Circle (acquaintances).",
          "Identify 1 person in your middle circle who may be quietly struggling.",
          "Send an unprompted, vulnerability-affirming voice note (no generic texts): 'Thinking of you today, no need to reply quickly, just wanted you to know you matter to me.'"
        ]
      },
      partner: {
        title: "Raksha Relational Vulnerability Pact",
        timeNeeded: "20 mins",
        bestTime: "Quiet afternoon",
        steps: [
          "Tie a simple thread, ribbon, or tactile bracelet on each other's wrist.",
          "Declare one explicit protection: 'This season, I pledge to protect your peace by [listening without fixing / reminding you to rest].'",
          "Ask: 'Where are you feeling most unseen right now?'"
        ]
      },
      smallCircle: {
        title: "Micro-Sadya Shared Table (3-6 People)",
        timeNeeded: "1 hour",
        bestTime: "Sunday lunch",
        steps: [
          "Everyone brings one raw ingredient (rice, yogurt, lentils, mango).",
          "Prepare the meal together in the kitchen without screens.",
          "Serve each other before serving yourself; eat in unified rhythm."
        ]
      },
      community: {
        title: "Live Kinetic Pulse Circle",
        timeNeeded: "15 mins",
        bestTime: "Friday 8:00 PM",
        steps: [
          "Join the live video/audio rhythmic synchronized circle on Wisdom OS.",
          "Engage in synchronized box-breathing and group clapping to steady tempo."
        ]
      }
    }
  },
  {
    id: "anxiety-overwhelm",
    title: "Acute Cognitive Overload & Existential Panic",
    shortDesc: "Racing thoughts, chronic high-cortisol vigilance, feeling helpless under infinite information streams.",
    badge: "Parasympathetic Suppression",
    iconName: "Flame",
    accentColor: "#6366f1", // Indigo
    glowClass: "glow-indigo",
    symptoms: ["Chest tightness & shallow breathing", "Catastrophizing work & future", "Paralysis by overthinking", "Insomnia from racing thoughts"],
    intensityLevel: 9,
    historicalContext: {
      era: "Kashi Intellectual & Philosophical Academies (c. 950 CE)",
      location: "Varanasi / Ganges Basin",
      scale: "Scholars and merchants facing cognitive burnout and existential paralysis."
    },
    character: {
      id: "alok",
      name: "Scholar Alok",
      role: "Philosopher & Manuscript Custodian",
      avatarImage: "🕯️",
      backstory: "Varanasi, 950 CE. After years of intense disputation and preparing critical commentaries, Alok's mind has caught fire. He cannot sleep; every shadow seems like an error in his logic. He finds refuge in the Maha Shivaratri dark-vigil.",
      scenarios: [
        {
          stage: 1,
          prompt: "Alok sits amid stacks of birch-bark manuscripts in Kashi as the temple bells echo at dusk.",
          dialogue: "My intellect was once a sharp blade; now it turns inward, carving up my own sanity. I analyze ten thousand futures and every one ends in disaster. How do you silence an intellect that refuses to stop spinning?",
          choices: [
            {
              id: "c1_1",
              text: "'I know that feeling—we call it analysis paralysis and doomscrolling.'",
              consequence: "Alok nods in recognition. 'You have made the world a thousand times louder with your machines. The cure is not more information. The cure is radical subtraction. You must enter the darkness willingly.'",
              moodShift: "Shift to Subtractive Healing"
            },
            {
              id: "c1_2",
              text: "'Can we find a logical solution to quiet your worry?'",
              consequence: "Alok chuckles dryly. 'You cannot cure the poison of over-thinking with more thinking. The mind is a pond; to clear mud, you do not stir the water with a stick. You sit motionless.'",
              moodShift: "Somatic Stillness Grounding"
            }
          ]
        },
        {
          stage: 2,
          prompt: "The moonless night of Maha Shivaratri arrives. The temple courtyard is dark save for single clay oil lamps (Diyas).",
          dialogue: "We keep the spine upright through the darkest night. We light a single wick and practice Trataka (unwavering flame gazing). When the physical gaze holds still on one point, the internal torrent of thoughts halts. Will you sit with me?",
          choices: [
            {
              id: "c2_1",
              text: "'Teach me the Trataka flame meditation technique.'",
              consequence: "Alok positions the oil lamp at eye level. 'Fix your gaze on the tip of the flame without blinking until tears form naturally. As the tears cleanse the eye, the parasympathetic nerve signals safety to the amygdala.'",
              moodShift: "Neuro-Vagal De-escalation"
            },
            {
              id: "c2_2",
              text: "'Why keep the spine erect instead of lying down?'",
              consequence: "Alok straightens his posture: 'Lying down when anxious induces rumination or fractured sleep. An erect spine allows optimal diaphragm descent and vagal nerve stimulation, anchoring alertness without panic.'",
              moodShift: "Postural Neurological Alignment"
            }
          ]
        }
      ]
    },
    culturalSolution: {
      name: "Maha Shivaratri & Trataka Single-Point Concentration",
      region: "Pan-Indic contemplative tradition",
      corePrinciple: "Sensory Deprivation, Spine Alignment & Dark-Vigil Reset",
      evolution: "Created as an annual deep-nervous-system reset to dissolve the Default Mode Network (DMN) rumination cycle.",
      mechanisms: [
        {
          title: "Default Mode Network (DMN) Quenching",
          category: "Neuroscience",
          detail: "Single-point candle gazing (Trataka) significantly down-regulates posterior cingulate cortex activity, halting self-referential rumination.",
          citation: "Brewer et al., PNAS (2011); Travis et al., Cognitive Processing (2014)"
        },
        {
          title: "Vagal Nerve Stimulation via Diaphragmatic Anchoring",
          category: "Autonomic Health",
          detail: "Prolonged vertical spinal posture with slow resonant breathing (0.1 Hz) increases heart rate variability (HRV) and suppresses sympathetic surge.",
          citation: "Zaccaro et al., Frontiers in Human Neuroscience (2018)"
        },
        {
          title: "Photopic Dark Adaptation & Melatonin Priming",
          category: "Circadian Biology",
          detail: "Replacing blue screens with single golden-wavelength candlelight restores nocturnal pineal gland melatonin signaling.",
          citation: "Chang et al., PNAS (2015)"
        }
      ]
    },
    protocols: {
      solo: {
        title: "10-Minute Trataka Flame De-escalation",
        timeNeeded: "10 mins",
        bestTime: "Night before sleep",
        sensoryAnchor: "Real candle or oil lamp (or digital candle mode)",
        steps: [
          "Dim all room lights. Place a candle 2-3 feet away at eye level.",
          "Gaze steadily at the flame for 3 minutes without blinking until eyes water lightly.",
          "Close your eyes and visualize the after-image glowing between your eyebrows for 3 minutes.",
          "Practice 4-7-8 breathing: Inhale 4s, Hold 7s, Exhale slowly through mouth 8s (repeat 4 cycles)."
        ]
      },
      partner: {
        title: "Silent Co-Presence Grounding",
        timeNeeded: "10 mins",
        bestTime: "Evening",
        steps: [
          "Sit back-to-back on a carpet or cushions with spines aligned.",
          "Close eyes. Match each other's breathing tempo without speaking for 7 minutes.",
          "Feel the physical support of another human spine stabilizing your own nervous system."
        ]
      },
      smallCircle: {
        title: "Deepam Circle of Stillness",
        timeNeeded: "30 mins",
        bestTime: "Friday night",
        steps: [
          "Place one central oil lamp in the middle of a darkened room.",
          "Sit in a circle. Each person passes a bowl of fragrant water/camphor.",
          "15 minutes of uninterrupted silence followed by one word from each member describing their present state."
        ]
      },
      community: {
        title: "Global Midnight Vigil Circle",
        timeNeeded: "20 mins",
        bestTime: "Midnight in your timezone",
        steps: [
          "Join the synchronized dark-screen contemplation room on Wisdom OS.",
          "Watch the collective global flame gauge stabilize as thousands practice simultaneously."
        ]
      }
    }
  },
  {
    id: "purpose-aimlessness",
    title: "Generational Aimlessness & Identity Crisis",
    shortDesc: "Feeling unmoored, doing work that feels meaningless, paralyzed by societal expectations and comparison.",
    badge: "Existential & Meaning Deficit",
    iconName: "Compass",
    accentColor: "#f59e0b", // Amber
    glowClass: "glow-gold",
    symptoms: ["Existential dread on Sunday evenings", "Imposter syndrome & chronic comparison", "Feeling detached from your own life", "Paralysis when making big choices"],
    intensityLevel: 7,
    historicalContext: {
      era: "Kingdom of Mewar & Bhakti Awakening (c. 1530 CE)",
      location: "Rajasthan",
      scale: "Individuals breaking out of rigid social conditioning to author authentic purpose."
    },
    character: {
      id: "meera",
      name: "Meera",
      role: "Mystic Poet & Dissident",
      avatarImage: "🪕",
      backstory: "Mewar, 1530. Born into high royalty, expected to conform to political marriages and courtly decorum. Meera refused to surrender her inner calling for hollow social applause.",
      scenarios: [
        {
          stage: 1,
          prompt: "Meera sits by the temple archway at dawn with her ektara string instrument.",
          dialogue: "They built palaces of marble to cage my soul. They told me who to marry, how to sit, and what to value. But when you anchor in what is eternal, mortal approval becomes like dry leaves in the wind. What are you sacrificing your soul for?",
          choices: [
            {
              id: "c1_1",
              text: "'I'm trapped trying to meet my parents' and society's definition of success.'",
              consequence: "Meera plucks a resonant note on her string. 'The tragedy is not failing their expectations. The tragedy is succeeding at their game and waking up at fifty with an empty heart. Nishkama Karma means you own your effort, but never surrender your soul to external scorecards.'",
              moodShift: "Values Clarification & Courage"
            },
            {
              id: "c1_2",
              text: "'I don't even know what my true purpose is.'",
              consequence: "Meera smiles with piercing warmth: 'Purpose is not a destination written on a map. It is the devotion you bring to the next honest step. Clay dissolves in water during Ganesh Visarjan so new forms can be born. Allow your false identities to dissolve.'",
              moodShift: "Liberation from Rigid Identity"
            }
          ]
        }
      ]
    },
    culturalSolution: {
      name: "Nishkama Karma & Visarjan Impermanence Protocol",
      region: "Bhagavad Gita philosophy & Maharashtra Ganesh Visarjan",
      corePrinciple: "Outcome Detachment & Sacred Identity Fluidity",
      evolution: "Formulated to eradicate performance anxiety and align action with intrinsic values rather than external validation.",
      mechanisms: [
        {
          title: "Cognitive Defusion from Ego-Goals",
          category: "Acceptance & Commitment Therapy (ACT)",
          detail: "Decoupling self-worth from material outcomes reduces performance cortisol and unlocks intrinsic flow states.",
          citation: "Hayes et al., Clinical Psychology Review (2006); Ryan & Deci, Self-Determination Theory"
        },
        {
          title: "Visarjan Clay Dissolution Metaphor",
          category: "Psychological Containment",
          detail: "Creating an exquisite clay deity and willfully returning it to the river provides neurological training in somatic non-attachment and grief resilience.",
          citation: "Norton & Gino, J Exp Psychol Gen (2014)"
        }
      ]
    },
    protocols: {
      solo: {
        title: "Nishkama Karma Audit & Visarjan Release",
        timeNeeded: "15 mins",
        bestTime: "Sunday morning",
        sensoryAnchor: "A small piece of clay, earth, or dissolvable paper",
        steps: [
          "List your top 3 current projects or career anxieties.",
          "For each item, separate: (A) What is 100% in your control vs (B) What is outside your control (reputation, boss approval, market results).",
          "Draw an explicit line through (B). Dedicate your full energy exclusively to (A).",
          "Write 1 false social expectation on paper and dissolve it in water or bury it in soil."
        ]
      },
      partner: {
        title: "Values Over Metrics Dialogue",
        timeNeeded: "20 mins",
        bestTime: "Weekend walk",
        steps: [
          "Walk together outdoors without looking at phones.",
          "Ask: 'If all social media status and financial judgment vanished tomorrow, what problem would you still want to solve?'"
        ]
      },
      smallCircle: {
        title: "Clay Visarjan Gathering",
        timeNeeded: "45 mins",
        bestTime: "Seasonal transitions",
        steps: [
          "Shape small clay symbols representing your current limiting self-concept.",
          "Place them together in a basin of water and watch them return to natural mud."
        ]
      },
      community: {
        title: "Collective Purpose Re-alignment",
        timeNeeded: "10 mins",
        bestTime: "First of every month",
        steps: ["Join the monthly global intention anchor on Wisdom OS."]
      }
    }
  },
  {
    id: "grief-letting-go",
    title: "Trauma Fixation, Grief & Fear of Transition",
    shortDesc: "Clinging to past heartbreaks, unprocessed loss, stuck in rumination loops and fear of the future.",
    badge: "Emotional Containment Deficit",
    iconName: "ShieldAlert",
    accentColor: "#f43f5e", // Ruby
    glowClass: "glow-ruby",
    symptoms: ["Replaying past conversations for hours", "Unprocessed grief over relationships/careers", "Inability to forgive self or others", "Emotional numbness"],
    intensityLevel: 8,
    historicalContext: {
      era: "Silk Route Oasis & Commercial Hub of Ujjain (c. 640 CE)",
      location: "Central India",
      scale: "Traders and families rebuilding after catastrophic losses and plagues."
    },
    character: {
      id: "anand",
      name: "Merchant Anand",
      role: "Caravan Master & Silk Trader",
      avatarImage: "🏺",
      backstory: "Ujjain, 640 CE. Anand's 200-camel caravan was destroyed in the Thar desert storms. He lost everything and spent two years locked in his room, weeping over dried ink ledgers until the Holika Dahan bonfire ritual forced him to confront the ashes.",
      scenarios: [
        {
          stage: 1,
          prompt: "Anand stands by the dry riverbed with his burned caravan ledger in hand.",
          dialogue: "I kept recounting the gold I lost. Every morning I re-lived the storm, cursing the wind, cursing myself. But the past is a phantom that feeds on your life force. What dead ship are you still trying to captain?",
          choices: [
            {
              id: "c1_1",
              text: "'I keep regretting a choice I made that ruined a major chapter of my life.'",
              consequence: "Anand grips your arm firmly: 'The Holika pyre is built with dry branches—branches that no longer carry sap. Your regret is dry wood. Feed it to the fire. Ashes cannot be rearranged; they fertilize the earth for new crops.'",
              moodShift: "Somatic Emotional Purge"
            },
            {
              id: "c1_2",
              text: "'How do you forgive someone who betrayed your trust?'",
              consequence: "Anand tosses a dry stick into the embers: 'Forgiveness is not declaring what they did was right. Forgiveness is refusing to carry their poison in your own blood every single morning.'",
              moodShift: "Cognitive Liberation"
            }
          ]
        }
      ]
    },
    culturalSolution: {
      name: "Holika Dahan & Dussehra Effigy Purge Protocol",
      region: "Pan-Indian transmutational fire ceremonies",
      corePrinciple: "Externalized Somatic Catharsis & Ash Alchemy",
      evolution: "Ancient behavioral technology utilizing controlled external fire rituals to mark definitive psychological closure.",
      mechanisms: [
        {
          title: "Symbolic Externalization & Closure",
          category: "Clinical Psychology",
          detail: "Physical destruction of written artifacts in fire provides tangible sensory proof of narrative termination to the cognitive system.",
          citation: "Gino & Norton, Scientific American / J Exp Psychol (2014)"
        },
        {
          title: "Color Saturation & Sensorimotor Reset",
          category: "Neuroscience",
          detail: "Following the fire purge with vibrant organic colors (Holi) floods sensory pathways, breaking chronic depressive flat affect.",
          citation: "Elliot & Maier, Annual Review of Psychology (2014)"
        }
      ]
    },
    protocols: {
      solo: {
        title: "12-Minute Fire & Water Purge",
        timeNeeded: "12 mins",
        bestTime: "Sunset or night",
        sensoryAnchor: "Safe heat-proof bowl, matches, piece of paper, water",
        steps: [
          "Write the raw, unfiltered resentment or grief on paper with a pen.",
          "Hold the paper and speak aloud: 'I acknowledge the pain this caused. I refuse to let it occupy my future.'",
          "Safely burn the paper in the heat-proof bowl.",
          "Wash your hands with cold water, visualizing the mental residue washing down the drain."
        ]
      },
      partner: {
        title: "Forgiveness Release Exchange",
        timeNeeded: "15 mins",
        bestTime: "Quiet evening",
        steps: [
          "State: 'Here is something I have held against you/myself that I am releasing tonight.'",
          "Partner responds: 'Received and released.'"
        ]
      },
      smallCircle: {
        title: "Bonfire Effigy Circle",
        timeNeeded: "45 mins",
        bestTime: "Autumn / Spring eve",
        steps: [
          "Construct a symbolic paper effigy containing all collective grievances from the past season and burn it together."
        ]
      },
      community: {
        title: "Global Purge Pulse",
        timeNeeded: "10 mins",
        bestTime: "Full Moon night",
        steps: ["Join the live anonymous global release stream on Wisdom OS."]
      }
    }
  },
  {
    id: "external-chaos-worry",
    title: "Financial Panic & Macro World Anxiety",
    shortDesc: "Terror over inflation, career stability, macro economics, and falling into scarcity mindset.",
    badge: "Scarcity Amygdala Priming",
    iconName: "TrendingDown",
    accentColor: "#06b6d4", // Cyan
    glowClass: "glow-emerald",
    symptoms: ["Compulsive checking of bank accounts/crypto", "Hoarding mindset & terror of spending", "Doom-reading economic collapse news", "Feeling unprotected"],
    intensityLevel: 8,
    historicalContext: {
      era: "Colonial Bengal & Trade Transitions (c. 1860 CE)",
      location: "Kolkata & Merchant Hubs",
      scale: "Communities navigating volatile trade disruptions."
    },
    character: {
      id: "radhika",
      name: "Radhika Devi",
      role: "Matriarch & Resource Architect",
      avatarImage: "🪔",
      backstory: "Bengal, 1860. In times of severe economic inflation and harvest price swings, Radhika organized the Lakshmi Pujan resource circle: cleaning homes, lighting golden lamps, and establishing emergency grain funds.",
      scenarios: [
        {
          stage: 1,
          prompt: "Radhika is methodically cleaning the brass threshold and lighting golden lamps.",
          dialogue: "When panic strikes the bazaar, people hoard every coin in dark corners. But wealth held in terror becomes toxic. Lakshmi is not greed; she is the radiant, clean circulation of life energy. Clean your space, light the doorway, and open your hands.",
          choices: [
            {
              id: "c1_1",
              text: "'How does cleaning and lighting lamps help when the economy is crashing?'",
              consequence: "Radhika looks up with serene authority: 'When your physical environment is chaotic, your brain remains in primal fight-or-flight. Cleaning restores order. Lighting the threshold signals safety to your nervous system, allowing strategic thinking rather than panic decisions.'",
              moodShift: "Somatic Order & Executive Function Reset"
            }
          ]
        }
      ]
    },
    culturalSolution: {
      name: "Lakshmi Auspicious Flow & Dana Generosity Protocol",
      region: "Diwali Lakshmi Pujan & Dana traditions",
      corePrinciple: "Sanctuary Order & Prosocial Scarcity Reversal",
      evolution: "Formulated to counter scarcity mindset through proactive environment purification and strategic micro-giving.",
      mechanisms: [
        {
          title: "Prosocial Giving and Scarcity Reversal",
          category: "Behavioral Economics",
          detail: "Engaging in structured micro-giving (Dana/Zakat) paradoxically signals abundance to the amygdala, reducing panic hoarding.",
          citation: "Aknin, Dunn, & Norton, J Pers Soc Psychol (2013)"
        },
        {
          title: "Environmental Order & Cortisol Attenuation",
          category: "Environmental Psychology",
          detail: "Clearing physical clutter and introducing warm golden illumination significantly lowers baseline salivary cortisol.",
          citation: "Saxbe & Repetti, Personality and Social Psychology Bulletin (2010)"
        }
      ]
    },
    protocols: {
      solo: {
        title: "15-Minute Sanctuary Reset & Micro-Dana",
        timeNeeded: "15 mins",
        bestTime: "Thursday or Friday evening",
        sensoryAnchor: "Brass dish, oil lamp, clean water, coin",
        steps: [
          "Deep clean and organize your primary workspace and entryway.",
          "Light a single warm lamp or candle at the threshold.",
          "Set aside a small fixed amount to give anonymously to someone in need.",
          "Audit your finances with calm breath, writing 3 non-monetary assets you currently possess (skills, health, relationships)."
        ]
      },
      partner: {
        title: "Abundance Alignment Check",
        timeNeeded: "15 mins",
        bestTime: "Sunday evening",
        steps: ["Review goals through the lens of contribution and circulation rather than panic hoarding."]
      },
      smallCircle: {
        title: "Community Mutual Support Pot",
        timeNeeded: "30 mins",
        bestTime: "Monthly",
        steps: ["Create a shared informal safety net or emergency skill pool."]
      },
      community: {
        title: "Global Abundance Pulse",
        timeNeeded: "5 mins",
        bestTime: "Anytime",
        steps: ["Contribute a message of resilience to the global Wisdom OS board."]
      }
    }
  },
  {
    id: "circadian-physical-depletion",
    title: "Digital Dysregulation, Insomnia & Somatic Depletion",
    shortDesc: "Screentime fatigue, disrupted melatonin, waking up groggy, disconnected from physical biology.",
    badge: "Circadian Retinal Misalignment",
    iconName: "Moon",
    accentColor: "#a855f7", // Purple
    glowClass: "glow-indigo",
    symptoms: ["Screen-induced insomnia", "Brain fog before noon", "Heavy somatic fatigue in limbs", "Disrupted appetite cycles"],
    intensityLevel: 8,
    historicalContext: {
      era: "Vedic River Settlements (c. 800 BCE)",
      location: "Ganges-Yamuna Doab",
      scale: "Ancient solar-retinal attunement traditions."
    },
    character: {
      id: "keshava",
      name: "Keshava",
      role: "Solar Healer & River Custodian",
      avatarImage: "🌊",
      backstory: "Ancient river settlement, 800 BCE. Master of the Chhath solar water offerings (Arghya) and Brahma Muhurtha circadian synchronization.",
      scenarios: [
        {
          stage: 1,
          prompt: "Keshava stands waist-deep in the cool morning river holding water in a brass pot toward the rising red sun.",
          dialogue: "You stare at artificial rectangles until midnight, and then wonder why sleep eludes you. The eye is not merely a camera; it is the master clock of the brain. When you look at the morning sun through water, you re-align your biology with the cosmos.",
          choices: [
            {
              id: "c1_1",
              text: "'How does viewing the sun through water work?'",
              consequence: "Keshava pours the water gently: 'The red and infrared light of dawn penetrates deeply, activating the retinal ganglion cells that tell your body: awaken, build energy now so you can sleep in peace tonight.'",
              moodShift: "Circadian Alignment"
            }
          ]
        }
      ]
    },
    culturalSolution: {
      name: "Chhath Puja Solar Arghya & Brahma Muhurtha Protocol",
      region: "Bihar, UP, pan-Himalayan traditions",
      corePrinciple: "Direct Phototransduction & Cold Somatic Grounding",
      evolution: "Formulated over 2,500 years to optimize hormonal cascades, cellular longevity, and nocturnal deep sleep architecture.",
      mechanisms: [
        {
          title: "Intrinsically Photosensitive Retinal Ganglion Cell (ipRGC) Priming",
          category: "Circadian Biology",
          detail: "Low solar angle exposure activates melanopsin, suppressing melatonin instantly and timing the evening sleep-wake gate 14 hours later.",
          citation: "Panda, S., The Circadian Code; Berson et al., Science (2002)"
        },
        {
          title: "Cold Water Hydrotherapy & Vagal Tone",
          category: "Physiology",
          detail: "Morning immersion in natural water triggers peripheral vasoconstriction, dopamine upregulation, and anti-inflammatory pathways.",
          citation: "Srámek et al., Eur J Appl Physiol (2000)"
        }
      ]
    },
    protocols: {
      solo: {
        title: "Brahma Muhurtha 10-Minute Solar Splash",
        timeNeeded: "10 mins",
        bestTime: "At dawn (within 30m of sunrise)",
        sensoryAnchor: "Cold water, brass/copper vessel (optional)",
        steps: [
          "Splash cold water on face and eyes 5 times upon waking.",
          "Step outside; look toward the rising sun for 7 minutes without screens or sunglasses.",
          "Breathe deeply through the nose: 30 quick rhythmic breaths followed by deep breath hold (Kapalabhati/Solar breath)."
        ]
      },
      partner: {
        title: "Morning Sun Walk",
        timeNeeded: "20 mins",
        bestTime: "Sunrise",
        steps: ["Walk silently facing east together for the first 10 minutes."]
      },
      smallCircle: {
        title: "Sunrise River/Park Circle",
        timeNeeded: "30 mins",
        bestTime: "Weekend dawn",
        steps: ["Practice outdoor group sun salutations and cold morning air grounding."]
      },
      community: {
        title: "Global Sunrise Pulse",
        timeNeeded: "10 mins",
        bestTime: "Local sunrise",
        steps: ["Check in on Wisdom OS right as your local sun crosses the horizon."]
      }
    }
  },
  {
    id: "generational-fracture",
    title: "Family Conflict & Diaspora Identity Alienation",
    shortDesc: "Feeling alienated from parents/elders, guilt about traditional heritage, communication breakdown across generations.",
    badge: "Ancestral & Intergenerational Fracture",
    iconName: "HeartHandshake",
    accentColor: "#ec4899", // Pink
    glowClass: "glow-ruby",
    symptoms: ["Dreading phone calls with parents", "Cultural shame or feeling disconnected from roots", "Sibling estrangement", "Generational misunderstanding"],
    intensityLevel: 7,
    historicalContext: {
      era: "Pan-Asian & Indian Diaspora Networks (c. 1900-Present)",
      location: "Global Migration corridors",
      scale: "Generations separated by language, worldview, and geography."
    },
    character: {
      id: "ananya",
      name: "Ananya & Vikram",
      role: "Diaspora Reconcilers",
      avatarImage: "🪢",
      backstory: "A brother and sister separated across oceans who rediscovered how simple structured ritual (Raksha Bandhan & Shraddha reconciliation) restored broken family dialogue without political arguments.",
      scenarios: [
        {
          stage: 1,
          prompt: "Ananya holds an old silk thread envelope sent from across the continent.",
          dialogue: "We spent years arguing about politics and lifestyle choices at the dinner table. We forgot that beneath the opinions, we share the same blood and ancestors. Ritual creates a sacred space where the arguments stop and love speaks.",
          choices: [
            {
              id: "c1_1",
              text: "'How do I bridge the gap when my parents and I disagree on everything?'",
              consequence: "Ananya smiles: 'Do not debate opinions. Ask for their stories. Ask: 'What was your hardest winter when you were twenty?' When you see them as wounded humans rather than authority figures, compassion replaces anger.'",
              moodShift: "Intergenerational Empathy"
            }
          ]
        }
      ]
    },
    culturalSolution: {
      name: "Raksha Bandhan & Pitru Ancestral Reconciliation Protocol",
      region: "Pan-Indian family systems",
      corePrinciple: "Structured Reciprocal Reverence & Non-Debative Bonding",
      evolution: "Designed to transcend ideological disputes by anchoring relationships in visceral duty, care, and remembrance.",
      mechanisms: [
        {
          title: "Intergenerational Perspective Taking",
          category: "Developmental Psychology",
          detail: "Engaging in heritage rituals reduces cultural shame and strengthens narrative identity coherence in young adults.",
          citation: "McAdams & McLean, Current Directions in Psychological Science (2013)"
        },
        {
          title: "De-escalation via Structured Scripting",
          category: "Family Systems Therapy",
          detail: "Pre-set verbal formulas in rituals ('May you be protected') bypass contentious conversational traps, restoring baseline attachment safety.",
          citation: "Fiese et al., J Family Psychology (2002)"
        }
      ]
    },
    protocols: {
      solo: {
        title: "15-Minute Ancestral Forgiveness Letter",
        timeNeeded: "15 mins",
        bestTime: "Evening",
        sensoryAnchor: "A family photo or heirloom object",
        steps: [
          "Place a photo or think of a parent/ancestor with whom you feel friction.",
          "Acknowledge the hardships they endured that you never had to face.",
          "Write: 'I release the expectation that you should have been perfect. I take the good you gave and forgive the rest.'",
          "Send a simple, warm appreciation message: 'Thank you for [specific thing from childhood]. Thinking of you today.'"
        ]
      },
      partner: {
        title: "Relational Boundary Covenant",
        timeNeeded: "20 mins",
        bestTime: "Quiet conversation",
        steps: ["Reaffirm loyalty while establishing mutual respect for personal differences."]
      },
      smallCircle: {
        title: "Family Storytelling Hearth",
        timeNeeded: "1 hour",
        bestTime: "Family dinner",
        steps: ["Elders share 1 story of adversity; youth listen without debate."]
      },
      community: {
        title: "Diaspora Roots Circle",
        timeNeeded: "20 mins",
        bestTime: "Monthly",
        steps: ["Connect with global diaspora members reclaiming ancestral wisdom without dogma."]
      }
    }
  }
];

export function getProblemById(id) {
  return PROBLEM_CATEGORIES.find(p => p.id === id) || PROBLEM_CATEGORIES[0];
}
