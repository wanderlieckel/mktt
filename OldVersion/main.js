const form = document.getElementById('formOrdem');
const tbody = document.querySelector('#ordensTable tbody');
const tibiaCoinInput = document.getElementById('tibiaCoinInput');
const inputItem = document.getElementById('itemNome');
const inputQtd = document.getElementById('itemQtd');
const inputValor = document.getElementById('itemValor');
const listaSugestoes = document.getElementById('sugestoes');

const tcVendaReais = 0.22;
let esconderFechadas = false;

const itensArray = [
    { item_name: "Buckle", item_value: 7000 },
    { item_name: "Crystalline Armor", item_value: 16000 },
    { item_name: "Divine Plate", item_value: 55000 },
    { item_name: "Dragon Scale Mail", item_value: 40000 },
    { item_name: "Dwarven Armor", item_value: 30000 },
    { item_name: "Flower Dress", item_value: 1000 },
    { item_name: "Glacier Robe", item_value: 11000 },
    { item_name: "Golden Armor", item_value: 20000 },
    { item_name: "Goo Shell", item_value: 4000 },
    { item_name: "Hibiscus Dress", item_value: 3000 },
    { item_name: "Lavos Armor", item_value: 16000 },
    { item_name: "Leopard Armor", item_value: 1000 },
    { item_name: "Lightning Robe", item_value: 11000 },
    { item_name: "Magic Plate Armor", item_value: 90000 },
    { item_name: "Magma Coat", item_value: 11000 },
    { item_name: "Mammoth Fur Cape", item_value: 6000 },
    { item_name: "Paladin Armor", item_value: 15000 },
    { item_name: "Pirate Shirt", item_value: 500 },
    { item_name: "Skullcracker Armor", item_value: 18000 },
    { item_name: "Swamplair Armor", item_value: 16000 },
    { item_name: "Terra Mantle", item_value: 11000 },
    { item_name: "Coconut Shoes", item_value: 500 },
    { item_name: "Crocodile Boots", item_value: 1000 },
    { item_name: "Fur Boots", item_value: 2000 },
    { item_name: "Glacier Shoes", item_value: 2500 },
    { item_name: "Lightning Boots", item_value: 2500 },
    { item_name: "Magma Boots", item_value: 2500 },
    { item_name: "Oriental Shoes", item_value: 15000 },
    { item_name: "Patched Boots", item_value: 2000 },
    { item_name: "Pirate Boots", item_value: 3000 },
    { item_name: "Steel Boots", item_value: 30000 },
    { item_name: "Terra Boots", item_value: 2500 },
    { item_name: "Bandana", item_value: 150 },
    { item_name: "Bonelord Helmet", item_value: 7500 },
    { item_name: "Cobra Crown", item_value: 50000 },
    { item_name: "Devil Helmet", item_value: 1000 },
    { item_name: "Flower Wreath", item_value: 500 },
    { item_name: "Glacier Mask", item_value: 2500 },
    { item_name: "Helmet of The Lost", item_value: 2000 },
    { item_name: "Krimhorn Helmet", item_value: 200 },
    { item_name: "Lightning Headband", item_value: 2500 },
    { item_name: "Magma Monocle", item_value: 2500 },
    { item_name: "Pirate Hat", item_value: 1000 },
    { item_name: "Ragnir Helmet", item_value: 400 },
    { item_name: "Skull Helmet", item_value: 40000 },
    { item_name: "Terra Hood", item_value: 2500 },
    { item_name: "Witch Hat", item_value: 5000 },
    { item_name: "Ancient Amulet", item_value: 200 },
    { item_name: "Beetle Necklace", item_value: 1500 },
    { item_name: "Crystal Necklace", item_value: 400 },
    { item_name: "Crystal Ring", item_value: 250 },
    { item_name: "Death Ring", item_value: 1000 },
    { item_name: "Demonbone Amulet", item_value: 32000 },
    { item_name: "Emerald Bangle", item_value: 800 },
    { item_name: "Glacier Amulet", item_value: 1500 },
    { item_name: "Gold Ring", item_value: 8000 },
    { item_name: "Horn (Ring)", item_value: 300 },
    { item_name: "Leviathan's Amulet", item_value: 3000 },
    { item_name: "Lightning Pendant", item_value: 1500 },
    { item_name: "Magma Amulet", item_value: 1500 },
    { item_name: "Onyx Pendant", item_value: 3500 },
    { item_name: "Platinum Amulet", item_value: 2500 },
    { item_name: "Ring of the Sky", item_value: 30000 },
    { item_name: "Ruby Necklace", item_value: 2000 },
    { item_name: "Sacred Tree Amulet", item_value: 3000 },
    { item_name: "Scarab Amulet", item_value: 200 },
    { item_name: "Shockwave Amulet", item_value: 3000 },
    { item_name: "Silver Brooch", item_value: 150 },
    { item_name: "Terra Amulet", item_value: 1500 },
    { item_name: "Glacier Kilt", item_value: 11000 },
    { item_name: "Golden Legs", item_value: 30000 },
    { item_name: "Leaf Legs", item_value: 500 },
    { item_name: "Lightning Legs", item_value: 11000 },
    { item_name: "Magma Legs", item_value: 11000 },
    { item_name: "Mammoth Fur Shorts", item_value: 850 },
    { item_name: "Pirate Knee Breeches", item_value: 200 },
    { item_name: "Terra Legs", item_value: 11000 },
    { item_name: "Doll", item_value: 200 },
    { item_name: "Hieroglyph Banner", item_value: 500 },
    { item_name: "Light Shovel", item_value: 300 },
    { item_name: "Model Ship", item_value: 1000 },
    { item_name: "Pharaoh Banner", item_value: 1000 },
    { item_name: "Pirate Voodoo Doll", item_value: 500 },
    { item_name: "Voodoo Doll", item_value: 400 },
    { item_name: "War Horn", item_value: 8000 },
    { item_name: "Bone Shield", item_value: 80 },
    { item_name: "Castle Shield", item_value: 5000 },
    { item_name: "Dark Shield", item_value: 400 },
    { item_name: "Demon Shield", item_value: 30000 },
    { item_name: "Griffin Shield", item_value: 3000 },
    { item_name: "Mastermind Shield", item_value: 50000 },
    { item_name: "Medusa Shield", item_value: 9000 },
    { item_name: "Norse Shield", item_value: 1500 },
    { item_name: "Rift Shield", item_value: 50000 },
    { item_name: "Scarab Shield", item_value: 2000 },
    { item_name: "Tempest Shield", item_value: 35000 },
    { item_name: "Tortoise Shield", item_value: 150 },
    { item_name: "Abyss Hammer", item_value: 20000 },
    { item_name: "Amber Staff", item_value: 8000 },
    { item_name: "Assassin Dagger", item_value: 20000 },
    { item_name: "Beastslayer Axe", item_value: 1500 },
    { item_name: "Berserker", item_value: 40000 },
    { item_name: "Blacksteel Sword", item_value: 6000 },
    { item_name: "Blessed Sceptre", item_value: 40000 },
    { item_name: "Brutetamer's Staff", item_value: 1500 },
    { item_name: "Chain Bolter", item_value: 40000 },
    { item_name: "Chaos Mace", item_value: 9000 },
    { item_name: "Composite Hornbow", item_value: 25000 },
    { item_name: "Cranial Basher", item_value: 30000 },
    { item_name: "Crystal Crossbow", item_value: 35000 },
    { item_name: "Crystal Mace", item_value: 12000 },
    { item_name: "Crystal Sword", item_value: 600 },
    { item_name: "Daramian Mace", item_value: 110 },
    { item_name: "Daramian Waraxe", item_value: 1000 },
    { item_name: "Demonrage Sword", item_value: 36000 },
    { item_name: "Diamond Sceptre", item_value: 3000 },
    { item_name: "Djinn Blade", item_value: 15000 },
    { item_name: "Dragon Slayer", item_value: 15000 },
    { item_name: "Dragonbone Staff", item_value: 3000 },
    { item_name: "Dreaded Cleaver", item_value: 10000 },
    { item_name: "Elvish Bow", item_value: 2000 },
    { item_name: "Epee", item_value: 8000 },
    { item_name: "Furry Club", item_value: 1000 },
    { item_name: "Guardian Halberd", item_value: 11000 },
    { item_name: "Hammer of Wrath", item_value: 30000 },
    { item_name: "Headchopper", item_value: 6000 },
    { item_name: "Heavy Mace", item_value: 50000 },
    { item_name: "Heavy Machete", item_value: 90 },
    { item_name: "Heavy Trident", item_value: 2000 },
    { item_name: "Heroic Axe", item_value: 30000 },
    { item_name: "Jade Hammer", item_value: 25000 },
    { item_name: "Lunar Staff", item_value: 5000 },
    { item_name: "Mammoth Whopper", item_value: 300 },
    { item_name: "Mercenary Sword", item_value: 12000 },
    { item_name: "Mycological Bow", item_value: 35000 },
    { item_name: "Mystic Blade", item_value: 30000 },
    { item_name: "Naginata", item_value: 2000 },
    { item_name: "Nightmare Blade", item_value: 35000 },
    { item_name: "Noble Axe", item_value: 10000 },
    { item_name: "Orcish Maul", item_value: 6000 },
    { item_name: "Pair of Iron Fists", item_value: 4000 },
    { item_name: "Pharaoh Sword", item_value: 23000 },
    { item_name: "Relic Sword", item_value: 25000 },
    { item_name: "Rift Bow", item_value: 45000 },
    { item_name: "Rift Crossbow", item_value: 45000 },
    { item_name: "Rift Lance", item_value: 30000 },
    { item_name: "Royal Axe", item_value: 40000 },
    { item_name: "Ruthless Axe", item_value: 45000 },
    { item_name: "Sapphire Hammer", item_value: 7000 },
    { item_name: "Silver Dagger", item_value: 500 },
    { item_name: "Spiked Squelcher", item_value: 5000 },
    { item_name: "Taurus Mace", item_value: 500 },
    { item_name: "The Justice Seeker", item_value: 40000 },
    { item_name: "Vile Axe", item_value: 30000 },
    { item_name: "War Axe", item_value: 12000 },
    { item_name: "Wyvern Fang", item_value: 1500 },
    { item_name: "Abomination's Eye", item_value: 650000 },
    { item_name: "Abomination's Tail", item_value: 700000 },
    { item_name: "Abomination's Tongue", item_value: 950000 },
    { item_name: "Acorn", item_value: 10 },
    { item_name: "Afflicted Strider Head", item_value: 900 },
    { item_name: "Afflicted Strider Worms", item_value: 500 },
    { item_name: "Alptramun's Toothbrush", item_value: 270000 },
    { item_name: "Ancient Belt Buckle", item_value: 260 },
    { item_name: "Ancient Liche Bone", item_value: 28000 },
    { item_name: "Angel Figurine", item_value: 36000 },
    { item_name: "Antlers", item_value: 50 },
    { item_name: "Ape Fur", item_value: 120 },
    { item_name: "Apron", item_value: 1300 },
    { item_name: "Atab's Mitmah Helmet", item_value: 580 },
    { item_name: "Arbaziloth Shoulder Piece", item_value: 450000 },
    { item_name: "Badger Fur", item_value: 15 },
    { item_name: "Bakragore's Amalgamation", item_value: 2000000 },
    { item_name: "Bamboo Stick", item_value: 30 },
    { item_name: "Banana Sash", item_value: 55 },
    { item_name: "Basalt Fetish", item_value: 210 },
    { item_name: "Basalt Figurine", item_value: 160 },
    { item_name: "Bashmu Fang", item_value: 600 },
    { item_name: "Bashmu Feather", item_value: 350 },
    { item_name: "Bashmu Tongue", item_value: 400 },
    { item_name: "Bat Decoration", item_value: 2000 },
    { item_name: "Bat Wing", item_value: 50 },
    { item_name: "Bear Paw", item_value: 100 },
    { item_name: "Beast's Nightmare-Cushion", item_value: 630000 },
    { item_name: "Bed of Nails", item_value: 500 },
    { item_name: "Beer Tap", item_value: 50 },
    { item_name: "Beetle Carapace", item_value: 200 },
    { item_name: "Behemoth Claw", item_value: 2000 },
    { item_name: "Black Hood", item_value: 190 },
    { item_name: "Black Wool", item_value: 300 },
    { item_name: "Blazing Bone", item_value: 610 },
    { item_name: "Blemished Spawn Abdomen", item_value: 550 },
    { item_name: "Blemished Spawn Head", item_value: 800 },
    { item_name: "Blemished Spawn Tail", item_value: 1000 },
    { item_name: "Bloated Maggot", item_value: 5200 },
    { item_name: "Blood Preservation", item_value: 320 },
    { item_name: "Blood Tincture in a Vial", item_value: 360 },
    { item_name: "Bloodstained Scythe", item_value: 4200 },
    { item_name: "Bloody Dwarven Beard", item_value: 110 },
    { item_name: "Bloody Pincers", item_value: 100 },
    { item_name: "Bloody Tears", item_value: 70000 },
    { item_name: "Blue Glass Plate", item_value: 60 },
    { item_name: "Blue Goanna Scale", item_value: 230 },
    { item_name: "Blue Piece of Cloth", item_value: 200 },
    { item_name: "Boar Man Hoof", item_value: 600 },
    { item_name: "Boggy Dreads", item_value: 200 },
    { item_name: "Bola", item_value: 35 },
    { item_name: "Bone Fetish", item_value: 150 },
    { item_name: "Bone Shoulderplate", item_value: 150 },
    { item_name: "Bone Toothpick", item_value: 150 },
    { item_name: "Bonecarving Knife", item_value: 190 },
    { item_name: "Bonelord Eye", item_value: 80 },
    { item_name: "Bones of Zorvorax", item_value: 10000 },
    { item_name: "Bony Tail", item_value: 210 },
    { item_name: "Book of Necromantic Rituals", item_value: 180 },
    { item_name: "Book of Prayers", item_value: 120 },
    { item_name: "Book Page", item_value: 640 },
    { item_name: "Bowl of Terror Sweat", item_value: 500 },
    { item_name: "Brain Head's Giant Neuron", item_value: 100000 },
    { item_name: "Brain Head's Left Hemisphere", item_value: 90000 },
    { item_name: "Brain Head's Right Hemisphere", item_value: 50000 },
    { item_name: "Brainstealer's Brain", item_value: 300000 },
    { item_name: "Brainstealer's Brainwave", item_value: 440000 },
    { item_name: "Brainstealer's Tissue", item_value: 240000 },
    { item_name: "Bright Bell", item_value: 220 },
    { item_name: "Brimstone Fangs", item_value: 380 },
    { item_name: "Brimstone Shell", item_value: 210 },
    { item_name: "Brinebrute Claw", item_value: 2600 },
    { item_name: "Broodrider Saddle", item_value: 2800 },
    { item_name: "Broken Crossbow", item_value: 30 },
    { item_name: "Broken Draken Mail", item_value: 340 },
    { item_name: "Broken Halberd", item_value: 100 },
    { item_name: "Broken Helmet", item_value: 20 },
    { item_name: "Broken Iks Cuirass", item_value: 640 },
    { item_name: "Broken Iks Faulds", item_value: 530 },
    { item_name: "Broken Iks Headpiece", item_value: 560 },
    { item_name: "Broken Iks Sandals", item_value: 440 },
    { item_name: "Broken Iks Spear", item_value: 685 },
    { item_name: "Broken Key Ring", item_value: 8000 },
    { item_name: "Broken Longbow", item_value: 130 },
    { item_name: "Broken Macuahuitl", item_value: 1000 },
    { item_name: "Broken Mitmah Chestplate", item_value: 85000 },
    { item_name: "Broken Mitmah Necklace", item_value: 210 },
    { item_name: "Broken Ring of Ending", item_value: 4000 },
    { item_name: "Broken Shamanic Staff", item_value: 35 },
    { item_name: "Broken Slicer", item_value: 120 },
    { item_name: "Broken Throwing Axe", item_value: 230 },
    { item_name: "Broken Visor", item_value: 1900 },
    { item_name: "Brooch of Embracement", item_value: 14000 },
    { item_name: "Brown Piece of Cloth", item_value: 100 },
    { item_name: "Bulltaur Armor Scrap", item_value: 480 },
    { item_name: "Bulltaur Hoof", item_value: 540 },
    { item_name: "Bulltaur Horn", item_value: 385 },
    { item_name: "Bunch of Troll Hair", item_value: 30 },
    { item_name: "Bundle of Cursed Straw", item_value: 800 },
    { item_name: "Capricious Heart", item_value: 2100 },
    { item_name: "Capricious Robe", item_value: 1200 },
    { item_name: "Carniphila Seeds", item_value: 50 },
    { item_name: "Carnisylvan Bark", item_value: 230 },
    { item_name: "Carnisylvan Finger", item_value: 250 },
    { item_name: "Carnivostrich Feather", item_value: 630 },
    { item_name: "Carrion Worm Fang", item_value: 35 },
    { item_name: "Cat's Paw", item_value: 2000 },
    { item_name: "Cave Chimera Head", item_value: 250 },
    { item_name: "Cave Chimera Leg", item_value: 650 },
    { item_name: "Cave Devourer Eyes", item_value: 550 },
    { item_name: "Cave Devourer Legs", item_value: 350 },
    { item_name: "Cave Devourer Maw", item_value: 600 },
    { item_name: "Centipede Leg", item_value: 28 },
    { item_name: "Chagorz Igneous Obsidian", item_value: 1100000 },
    { item_name: "Chasm Spawn Abdomen", item_value: 240 },
    { item_name: "Chasm Spawn Head", item_value: 850 },
    { item_name: "Chasm Spawn Tail", item_value: 120 },
    { item_name: "Cheese Cutter", item_value: 50 },
    { item_name: "Cheesy Figurine", item_value: 150 },
    { item_name: "Cheesy Membership Card", item_value: 120000 },
    { item_name: "Chicken Feather", item_value: 30 },
    { item_name: "Chitinous Mouth (Baron from Below)", item_value: 10000 },
    { item_name: "Chitinous Mouth (Count of the Core)", item_value: 10000 },
    { item_name: "Cliff Strider Claw", item_value: 800 },
    { item_name: "Closed Pocket Sundial", item_value: 5000 },
    { item_name: "Cobra Crest", item_value: 650 },
    { item_name: "Cobra Tongue", item_value: 15 },
    { item_name: "Colourful Feather", item_value: 110 },
    { item_name: "Colourful Feathers", item_value: 400 },
    { item_name: "Colourful Snail Shell", item_value: 250 },
    { item_name: "Compass", item_value: 45 },
    { item_name: "Compound Eye", item_value: 150 },
    { item_name: "Condensed Energy", item_value: 260 },
    { item_name: "Coral Branch", item_value: 360 },
    { item_name: "Corrupt Naga Scales", item_value: 570 },
    { item_name: "Corrupted Flag", item_value: 700 },
    { item_name: "Countess Sorrow's Frozen Tear", item_value: 50000 },
    { item_name: "Cow Bell", item_value: 120 },
    { item_name: "Crab Man Claws", item_value: 550 },
    { item_name: "Crab Pincers", item_value: 35 },
    { item_name: "Cracked Alabaster Vase", item_value: 180 },
    { item_name: "Crawler Head Plating", item_value: 210 },
    { item_name: "Crawler's Essence", item_value: 3700 },
    { item_name: "Crown (Cloak Of Terror)", item_value: 2700 },
    { item_name: "Cruelty's Chest", item_value: 720000 },
    { item_name: "Cruelty's Claw", item_value: 640000 },
    { item_name: "Crystal Bone", item_value: 250 },
    { item_name: "Crystal of the Mitmah", item_value: 280 },
    { item_name: "Crystallized Anger", item_value: 400 },
    { item_name: "Crystallized Blood", item_value: 270000 },
    { item_name: "Cultish Mask", item_value: 280 },
    { item_name: "Cultish Robe", item_value: 150 },
    { item_name: "Cultish Symbol", item_value: 500 },
    { item_name: "Curious Matter", item_value: 430 },
    { item_name: "Curl of Hair", item_value: 320000 },
    { item_name: "Cursed Bone", item_value: 6000 },
    { item_name: "Cursed Shoulder Spikes", item_value: 320 },
    { item_name: "Cyclops Toe", item_value: 55 },
    { item_name: "Damaged Armor Plates", item_value: 280 },
    { item_name: "Damaged Worm Head", item_value: 8000 },
    { item_name: "Damselfly Eye", item_value: 25 },
    { item_name: "Damselfly Wing", item_value: 20 },
    { item_name: "Dandelion Seeds", item_value: 200 },
    { item_name: "Dangerous Proto Matter", item_value: 300 },
    { item_name: "Dark Bell", item_value: 250 },
    { item_name: "Dark Bell (Sino)", item_value: 310000 },
    { item_name: "Dark Obsidian Splinter", item_value: 4400 },
    { item_name: "Dark Rosary", item_value: 48 },
    { item_name: "Darklight Basalt Chunk", item_value: 3800 },
    { item_name: "Darklight Core (Item)", item_value: 4100 },
    { item_name: "Darklight Figurine", item_value: 3400000 },
    { item_name: "Darklight Matter (Item)", item_value: 5500 },
    { item_name: "Dead Weight", item_value: 450 },
    { item_name: "Deepling Breaktime Snack", item_value: 90 },
    { item_name: "Deepling Claw", item_value: 430 },
    { item_name: "Deepling Guard Belt Buckle", item_value: 230 },
    { item_name: "Deepling Ridge", item_value: 360 },
    { item_name: "Deepling Scales", item_value: 80 },
    { item_name: "Deepling Warts", item_value: 180 },
    { item_name: "Deeptags", item_value: 290 },
    { item_name: "Deepworm Jaws", item_value: 500 },
    { item_name: "Deepworm Spike Roots", item_value: 650 },
    { item_name: "Deepworm Spikes", item_value: 800 },
    { item_name: "Demon Dust", item_value: 300 },
    { item_name: "Demon Horn", item_value: 1000 },
    { item_name: "Demonic Finger", item_value: 1000 },
    { item_name: "Demonic Skeletal Hand", item_value: 80 },
    { item_name: "Diabolic Skull", item_value: 19000 },
    { item_name: "Diremaw Brainpan", item_value: 350 },
    { item_name: "Diremaw Legs", item_value: 270 },
    { item_name: "Dirty Turban", item_value: 120 },
    { item_name: "Distorted Heart", item_value: 2100 },
    { item_name: "Distorted Robe", item_value: 1200 },
    { item_name: "Downy Feather", item_value: 20 },
    { item_name: "Dowser", item_value: 35 },
    { item_name: "Dracola's Eye", item_value: 50000 },
    { item_name: "Dracoyle Statue", item_value: 5000 },
    { item_name: "Dragolisk Eye", item_value: 690 },
    { item_name: "Dragolisk Poison Gland", item_value: 475 },
    { item_name: "Dragon Blood", item_value: 700 },
    { item_name: "Dragon Claw", item_value: 8000 },
    { item_name: "Dragon Priest's Wandtip", item_value: 175 },
    { item_name: "Dragon Tongue", item_value: 550 },
    { item_name: "Dragon's Tail", item_value: 100 },
    { item_name: "Draken Sulphur", item_value: 550 },
    { item_name: "Draken Wristbands", item_value: 430 },
    { item_name: "Dream Essence Egg", item_value: 205 },
    { item_name: "Dung Ball", item_value: 130 },
    { item_name: "Earflap", item_value: 40 },
    { item_name: "Elder Bonelord Tentacle", item_value: 150 },
    { item_name: "Elven Astral Observer", item_value: 90 },
    { item_name: "Elven Hoof", item_value: 115 },
    { item_name: "Elven Scouting Glass", item_value: 50 },
    { item_name: "Elvish Talisman", item_value: 45 },
    { item_name: "Empty Honey Glass", item_value: 270 },
    { item_name: "Enchanted Chicken Wing", item_value: 20000 },
    { item_name: "Encrypted Notes", item_value: 620 },
    { item_name: "Energy Ball", item_value: 300 },
    { item_name: "Energy Vein", item_value: 270 },
    { item_name: "Ensouled Essence", item_value: 820 },
    { item_name: "Essence of a Bad Dream", item_value: 360 },
    { item_name: "Exalted Seal", item_value: 190000 },
    { item_name: "Eye of a Deepling", item_value: 150 },
    { item_name: "Eye of a Weeper", item_value: 650 },
    { item_name: "Eye of Corruption", item_value: 390 },
    { item_name: "Eyeless Devourer Legs", item_value: 650 },
    { item_name: "Eyeless Devourer Maw", item_value: 420 },
    { item_name: "Eyeless Devourer Tongue", item_value: 900 },
    { item_name: "Fafnar Symbol", item_value: 950 },
    { item_name: "Fairy Wings", item_value: 200 },
    { item_name: "Falcon Crest", item_value: 650 },
    { item_name: "Fern", item_value: 20 },
    { item_name: "Fiery Heart", item_value: 375 },
    { item_name: "Fig Leaf", item_value: 200 },
    { item_name: "Figurine of Cruelty", item_value: 3100000 },
    { item_name: "Figurine of Greed", item_value: 2900000 },
    { item_name: "Figurine of Hatred", item_value: 2700000 },
    { item_name: "Figurine of Malice", item_value: 2800000 },
    { item_name: "Figurine of Megalomania", item_value: 5000000 },
    { item_name: "Figurine of Spite", item_value: 3000000 },
    { item_name: "Fir Cone", item_value: 25 },
    { item_name: "Fish Fin", item_value: 150 },
    { item_name: "Flask of Embalming Fluid", item_value: 30 },
    { item_name: "Flask of Warrior's Sweat", item_value: 10000 },
    { item_name: "Flotsam", item_value: 330 },
    { item_name: "Fox Paw", item_value: 100 },
    { item_name: "Frazzle Skin", item_value: 400 },
    { item_name: "Frazzle Tongue", item_value: 700 },
    { item_name: "Frost Giant Pelt", item_value: 160 },
    { item_name: "Frosty Ear of a Troll", item_value: 30 },
    { item_name: "Frosty Heart", item_value: 280 },
    { item_name: "Frozen Lightning", item_value: 270 },
    { item_name: "Fur Shred", item_value: 200 },
    { item_name: "Gauze Bandage", item_value: 90 },
    { item_name: "Geomancer's Robe", item_value: 80 },
    { item_name: "Geomancer's Staff", item_value: 120 },
    { item_name: "Ghastly Dragon Head", item_value: 700 },
    { item_name: "Ghostly Tissue", item_value: 90 },
    { item_name: "Ghoul Snack", item_value: 60 },
    { item_name: "Giant Eye", item_value: 380 },
    { item_name: "Giant Tentacle", item_value: 10000 },
    { item_name: "Girlish Hair Decoration", item_value: 30 },
    { item_name: "Girtablilu Warrior Carapace", item_value: 520 },
    { item_name: "Gland", item_value: 500 },
    { item_name: "Glistening Bone", item_value: 250 },
    { item_name: "Glob of Acid Slime", item_value: 25 },
    { item_name: "Glob of Mercury", item_value: 20 },
    { item_name: "Glob of Tar", item_value: 30 },
    { item_name: "Gloom Wolf Fur", item_value: 70 },
    { item_name: "Glowing Rune", item_value: 350 },
    { item_name: "Goanna Claw", item_value: 260 },
    { item_name: "Goanna Meat", item_value: 190 },
    { item_name: "Goblet of Gloom", item_value: 12000 },
    { item_name: "Goblin Ear", item_value: 20 },
    { item_name: "Gold-Brocaded Cloth", item_value: 175 },
    { item_name: "Gold-Scaled Sentinel", item_value: 380000 },
    { item_name: "Golden Brush", item_value: 250 },
    { item_name: "Golden Lotus Brooch", item_value: 270 },
    { item_name: "Golden Mask", item_value: 38000 },
    { item_name: "Golden Sun Coin", item_value: 11000 },
    { item_name: "Golden Tiger Coin", item_value: 11000 },
    { item_name: "Gorger Antlers", item_value: 2250 },
    { item_name: "Goosebump Leather", item_value: 650 },
    { item_name: "Grant of Arms", item_value: 950 },
    { item_name: "Grappling Hook (Rascacoon)", item_value: 150 },
    { item_name: "Greed's Arm", item_value: 950000 },
    { item_name: "Green Bandage", item_value: 180 },
    { item_name: "Green Dragon Leather", item_value: 100 },
    { item_name: "Green Dragon Scale", item_value: 100 },
    { item_name: "Green Glass Plate", item_value: 180 },
    { item_name: "Green Piece of Cloth", item_value: 200 },
    { item_name: "Grimace", item_value: 120000 },
    { item_name: "Gruesome Fan", item_value: 15000 },
    { item_name: "Guidebook", item_value: 200 },
    { item_name: "Hair of a Banshee", item_value: 350 },
    { item_name: "Half-Digested Piece of Meat", item_value: 55 },
    { item_name: "Half-Digested Stones", item_value: 40 },
    { item_name: "Half-Eaten Brain", item_value: 85 },
    { item_name: "Hand (Brachiodemon)", item_value: 1450 },
    { item_name: "Hardened Bone", item_value: 70 },
    { item_name: "Harpoon of a Giant Snail", item_value: 15000 },
    { item_name: "Harpy Feathers", item_value: 730 },
    { item_name: "Hatched Rorc Egg", item_value: 30 },
    { item_name: "Haunted Piece of Wood", item_value: 115 },
    { item_name: "Hazardous Heart", item_value: 2100 },
    { item_name: "Hazardous Robe", item_value: 1200 },
    { item_name: "Head (Brachiodemon)", item_value: 3500 },
    { item_name: "Head (Many Faces)", item_value: 3200 },
    { item_name: "Heaven Blossom", item_value: 50 },
    { item_name: "Hellhound Slobber", item_value: 500 },
    { item_name: "Hellhunter Eye", item_value: 2950 },
    { item_name: "Hellspawn Tail", item_value: 475 },
    { item_name: "Hemp Rope", item_value: 350 },
    { item_name: "Hideous Chunk", item_value: 510 },
    { item_name: "High Guard Flag", item_value: 550 },
    { item_name: "High Guard Shoulderplates", item_value: 130 },
    { item_name: "Holy Ash", item_value: 160 },
    { item_name: "Holy Orchid", item_value: 90 },
    { item_name: "Honeycomb", item_value: 40 },
    { item_name: "Horn of Kalyassa", item_value: 10000 },
    { item_name: "Horoscope", item_value: 40 },
    { item_name: "Huge Shell", item_value: 15000 },
    { item_name: "Huge Spiky Snail Shell", item_value: 8000 },
    { item_name: "Human Teeth", item_value: 2000 },
    { item_name: "Humongous Chunk", item_value: 540 },
    { item_name: "Hunter's Quiver", item_value: 80 },
    { item_name: "Hydra Head", item_value: 600 },
    { item_name: "Hydrophytes", item_value: 220 },
    { item_name: "Ice Flower", item_value: 370 },
    { item_name: "Ichgahal's Fungal Infestation", item_value: 900000 },
    { item_name: "Idol of the Forge", item_value: 950 },
    { item_name: "Incantation Notes", item_value: 90 },
    { item_name: "Infernal Heart", item_value: 2100 },
    { item_name: "Infernal Robe", item_value: 1200 },
    { item_name: "Inkwell (Black)", item_value: 720 },
    { item_name: "Instable Proto Matter", item_value: 300 },
    { item_name: "Iron Ore", item_value: 500 },
    { item_name: "Ivory Carving", item_value: 300 },
    { item_name: "Ivory Comb", item_value: 8000 },
    { item_name: "Izcandar's Snow Globe", item_value: 180000 },
    { item_name: "Izcandar's Sundial", item_value: 225000 },
    { item_name: "Jagged Sickle", item_value: 150000 },
    { item_name: "Jaws", item_value: 3900 },
    { item_name: "Jewelled Belt", item_value: 180 },
    { item_name: "Jungle Moa Claw", item_value: 160 },
    { item_name: "Jungle Moa Egg", item_value: 250 },
    { item_name: "Jungle Moa Feather", item_value: 140 },
    { item_name: "Katex' Blood", item_value: 210 },
    { item_name: "Key to the Drowned Library", item_value: 330 },
    { item_name: "Kollos Shell", item_value: 420 },
    { item_name: "Kongra's Shoulderpad", item_value: 100 },
    { item_name: "Lamassu Hoof", item_value: 330 },
    { item_name: "Lamassu Horn", item_value: 240 },
    { item_name: "Lancer Beetle Shell", item_value: 80 },
    { item_name: "Lancet", item_value: 90 },
    { item_name: "Lavafungus Head", item_value: 900 },
    { item_name: "Lavafungus Ring", item_value: 390 },
    { item_name: "Lavaworm Jaws", item_value: 1100 },
    { item_name: "Lavaworm Spike Roots", item_value: 600 },
    { item_name: "Lavaworm Spikes", item_value: 750 },
    { item_name: "Legionnaire Flags", item_value: 500 },
    { item_name: "Liodile Fang", item_value: 480 },
    { item_name: "Lion Cloak Patch", item_value: 190 },
    { item_name: "Lion Crest", item_value: 270 },
    { item_name: "Lion Seal", item_value: 210 },
    { item_name: "Lion's Mane", item_value: 60 },
    { item_name: "Little Bowl of Myrrh", item_value: 500 },
    { item_name: "Lizard Essence", item_value: 300 },
    { item_name: "Lizard Heart", item_value: 530 },
    { item_name: "Lizard Leather", item_value: 150 },
    { item_name: "Lizard Scale", item_value: 120 },
    { item_name: "Longing Eyes", item_value: 8000 },
    { item_name: "Lost Basher's Spike", item_value: 280 },
    { item_name: "Lost Bracers", item_value: 140 },
    { item_name: "Lost Husher's Staff", item_value: 250 },
    { item_name: "Lost Soul (Item)", item_value: 120 },
    { item_name: "Luminescent Crystal Pickaxe", item_value: 50 },
    { item_name: "Luminous Orb", item_value: 1000 },
    { item_name: "Lump of Dirt", item_value: 10 },
    { item_name: "Lump of Earth", item_value: 130 },
    { item_name: "Mad Froth", item_value: 80 },
    { item_name: "Magic Sulphur", item_value: 8000 },
    { item_name: "Makara Fin", item_value: 350 },
    { item_name: "Makara Tongue", item_value: 320 },
    { item_name: "Malice's Horn", item_value: 620000 },
    { item_name: "Malice's Spine", item_value: 850000 },
    { item_name: "Malofur's Lunchbox", item_value: 240000 },
    { item_name: "Mammoth Tusk", item_value: 100 },
    { item_name: "Mantassin Tail", item_value: 280 },
    { item_name: "Manticore Ear", item_value: 310 },
    { item_name: "Manticore Tail", item_value: 220 },
    { item_name: "Marsh Stalker Beak", item_value: 65 },
    { item_name: "Marsh Stalker Feather", item_value: 50 },
    { item_name: "Maxxenius Head", item_value: 500000 },
    { item_name: "Meat Hammer", item_value: 60 },
    { item_name: "Medal of Valiance", item_value: 410000 },
    { item_name: "Mega Dragon Heart", item_value: 1100 },
    { item_name: "Megalomania's Essence", item_value: 1900000 },
    { item_name: "Megalomania's Skull", item_value: 1500000 },
    { item_name: "Milk Churn", item_value: 100 },
    { item_name: "Minotaur Horn", item_value: 75 },
    { item_name: "Minotaur Leather", item_value: 80 },
    { item_name: "Miraculum", item_value: 60 },
    { item_name: "Molten Dragon Essence", item_value: 840 },
    { item_name: "Moon Compass", item_value: 5000 },
    { item_name: "Morbid Tapestry", item_value: 30000 },
    { item_name: "Morshabaal's Brain", item_value: 5000000 },
    { item_name: "Mould Heart", item_value: 2100 },
    { item_name: "Mould Robe", item_value: 1200 },
    { item_name: "Mouldy Powder", item_value: 200 },
    { item_name: "Mr. Punish's Handcuffs", item_value: 50000 },
    { item_name: "Murcion's Mycelium", item_value: 950000 },
    { item_name: "Mutated Bat Ear", item_value: 420 },
    { item_name: "Mutated Flesh", item_value: 50 },
    { item_name: "Mutated Rat Tail", item_value: 150 },
    { item_name: "Mystical Hourglass", item_value: 700 },
    { item_name: "Naga Archer Scales", item_value: 340 },
    { item_name: "Naga Armring", item_value: 390 },
    { item_name: "Naga Earring", item_value: 380 },
    { item_name: "Naga Warrior Scales", item_value: 340 },
    { item_name: "Necromantic Robe", item_value: 250 },
    { item_name: "Nettle Blossom", item_value: 75 },
    { item_name: "Nettle Spit", item_value: 25 },
    { item_name: "Nimmersatt's Seal", item_value: 520 },
    { item_name: "Noble Amulet", item_value: 430000 },
    { item_name: "Noble Cape", item_value: 425000 },
    { item_name: "Noble Turban", item_value: 430 },
    { item_name: "Nose Ring", item_value: 2000 },
    { item_name: "Odd Organ", item_value: 410 },
    { item_name: "Ogre Ear Stud", item_value: 180 },
    { item_name: "Ogre Nose Ring", item_value: 210 },
    { item_name: "Old Girtablilu Carapace", item_value: 570 },
    { item_name: "Old Royal Diary", item_value: 220000 },
    { item_name: "Orc Leather", item_value: 30 },
    { item_name: "Orc Tooth", item_value: 150 },
    { item_name: "Orcish Gear", item_value: 85 },
    { item_name: "Pair of Hellflayer Horns", item_value: 1300 },
    { item_name: "Pair of Old Bracers", item_value: 500 },
    { item_name: "Pale Worm's Scalp", item_value: 489000 },
    { item_name: "Parder Fur", item_value: 150 },
    { item_name: "Parder Tooth", item_value: 150 },
    { item_name: "Patch of Fine Cloth", item_value: 1350 },
    { item_name: "Peacock Feather Fan", item_value: 350 },
    { item_name: "Pelvis Bone", item_value: 30 },
    { item_name: "Perfect Behemoth Fang", item_value: 250 },
    { item_name: "Petrified Scream", item_value: 250 },
    { item_name: "Phantasmal Hair", item_value: 500 },
    { item_name: "Piece of Archer Armor", item_value: 20 },
    { item_name: "Piece of Crocodile Leather", item_value: 15 },
    { item_name: "Piece of Dead Brain", item_value: 420 },
    { item_name: "Piece of Massacre's Shell", item_value: 50000 },
    { item_name: "Piece of Scarab Shell", item_value: 45 },
    { item_name: "Piece of Swampling Wood", item_value: 30 },
    { item_name: "Piece of Warrior Armor", item_value: 50 },
    { item_name: "Pieces of Magic Chalk", item_value: 210 },
    { item_name: "Pig Foot", item_value: 10 },
    { item_name: "Pile of Grave Earth", item_value: 25 },
    { item_name: "Pirat's Tail", item_value: 180 },
    { item_name: "Pirate Coin", item_value: 110 },
    { item_name: "Plagueroot Offshoot", item_value: 280000 },
    { item_name: "Plasma Pearls", item_value: 250 },
    { item_name: "Plasmatic Lightning", item_value: 270 },
    { item_name: "Poison Gland", item_value: 210 },
    { item_name: "Poison Spider Shell", item_value: 10 },
    { item_name: "Poisonous Slime", item_value: 50 },
    { item_name: "Polar Bear Paw", item_value: 30 },
    { item_name: "Pool of Chitinous Glue", item_value: 480 },
    { item_name: "Porcelain Mask", item_value: 2000 },
    { item_name: "Powder Herb", item_value: 10 },
    { item_name: "Pristine Worm Head", item_value: 15000 },
    { item_name: "Protective Charm", item_value: 60 },
    { item_name: "Purified Soul (Item)", item_value: 260 },
    { item_name: "Purple Robe", item_value: 110 },
    { item_name: "Putrefactive Figurine", item_value: 3200000 },
    { item_name: "Quara Bone", item_value: 500 },
    { item_name: "Quara Eye", item_value: 350 },
    { item_name: "Quara Pincers", item_value: 410 },
    { item_name: "Quara Tentacle", item_value: 140 },
    { item_name: "Quill", item_value: 1100 },
    { item_name: "Rare Earth", item_value: 80 },
    { item_name: "Ratmiral's Hat", item_value: 150000 },
    { item_name: "Ravenous Circlet", item_value: 220000 },
    { item_name: "Red Dragon Leather", item_value: 200 },
    { item_name: "Red Dragon Scale", item_value: 200 },
    { item_name: "Red Goanna Scale", item_value: 270 },
    { item_name: "Red Hair Dye", item_value: 40 },
    { item_name: "Red Piece of Cloth", item_value: 300 },
    { item_name: "Rhindeer Antlers", item_value: 68 },
    { item_name: "Rhino Hide", item_value: 175 },
    { item_name: "Rhino Horn", item_value: 265 },
    { item_name: "Rhino Horn Carving", item_value: 300 },
    { item_name: "Ritual Tooth", item_value: 135 },
    { item_name: "Rogue Naga Scales", item_value: 570 },
    { item_name: "Rod (Bony Sea Devil)", item_value: 2200 },
    { item_name: "Roots", item_value: 1200 },
    { item_name: "Rope Belt", item_value: 66 },
    { item_name: "Rorc Egg", item_value: 120 },
    { item_name: "Rorc Feather", item_value: 70 },
    { item_name: "Rotten Feather", item_value: 120 },
    { item_name: "Rotten Heart", item_value: 74000 },
    { item_name: "Rotten Piece of Cloth", item_value: 30 },
    { item_name: "Rotten Roots", item_value: 3800 },
    { item_name: "Rotten Vermin Ichor", item_value: 4500 },
    { item_name: "Sabretooth (Item)", item_value: 400 },
    { item_name: "Safety Pin", item_value: 120 },
    { item_name: "Sample of Monster Blood", item_value: 250 },
    { item_name: "Sandcrawler Shell", item_value: 20 },
    { item_name: "Scale of Corruption", item_value: 680 },
    { item_name: "Scale of Gelidrazah", item_value: 10000 },
    { item_name: "Scarab Pincers", item_value: 280 },
    { item_name: "Scorpion Charm", item_value: 620 },
    { item_name: "Scorpion Tail", item_value: 25 },
    { item_name: "Scroll of Heroic Deeds", item_value: 230 },
    { item_name: "Scythe Leg", item_value: 450 },
    { item_name: "Sea Horse Figurine", item_value: 42000 },
    { item_name: "Sea Serpent Scale", item_value: 520 },
    { item_name: "Seeds", item_value: 150 },
    { item_name: "Shaggy Tail", item_value: 25 },
    { item_name: "Shamanic Hood", item_value: 45 },
    { item_name: "Shamanic Talisman", item_value: 200 },
    { item_name: "Shark Fins", item_value: 250 },
    { item_name: "Shimmering Beetles", item_value: 150 },
    { item_name: "Sight of Surrender's Eye", item_value: 3000 },
    { item_name: "Signet Ring (Valioso)", item_value: 480000 },
    { item_name: "Silencer Claws", item_value: 390 },
    { item_name: "Silencer Resonating Chamber", item_value: 600 },
    { item_name: "Silken Bookmark", item_value: 1300 },
    { item_name: "Silky Fur", item_value: 35 },
    { item_name: "Silver Hand Mirror", item_value: 10000 },
    { item_name: "Sineater Wing", item_value: 2100 },
    { item_name: "Single Human Eye", item_value: 1000 },
    { item_name: "Skeleton Decoration", item_value: 3000 },
    { item_name: "Skull Belt", item_value: 80 },
    { item_name: "Skull Fetish", item_value: 250 },
    { item_name: "Skull Shatterer", item_value: 170 },
    { item_name: "Skunk Tail", item_value: 50 },
    { item_name: "Slimy Leg", item_value: 4500 },
    { item_name: "Small Energy Ball", item_value: 250 },
    { item_name: "Small Flask of Eyedrops", item_value: 95 },
    { item_name: "Small Notebook", item_value: 480 },
    { item_name: "Small Oil Lamp", item_value: 150 },
    { item_name: "Small Pitchfork", item_value: 70 },
    { item_name: "Small Treasure Chest", item_value: 500 },
    { item_name: "Small Tropical Fish", item_value: 380 },
    { item_name: "Snake Skin", item_value: 400 },
    { item_name: "Sniper Gloves", item_value: 2000 },
    { item_name: "Solid Rage", item_value: 310 },
    { item_name: "Some Grimeleech Wings", item_value: 1200 },
    { item_name: "Soul Stone", item_value: 6000 },
    { item_name: "Spark Sphere", item_value: 350 },
    { item_name: "Sparkion Claw", item_value: 290 },
    { item_name: "Sparkion Legs", item_value: 310 },
    { item_name: "Sparkion Stings", item_value: 280 },
    { item_name: "Sparkion Tail", item_value: 300 },
    { item_name: "Spectral Gold Nugget", item_value: 500 },
    { item_name: "Spectral Silver Nugget", item_value: 250 },
    { item_name: "Spellreaper Staff Totem", item_value: 3100 },
    { item_name: "Spellsinger's Seal", item_value: 280 },
    { item_name: "Sphinx Feather", item_value: 470 },
    { item_name: "Sphinx Tiara", item_value: 360 },
    { item_name: "Spider Fangs", item_value: 10 },
    { item_name: "Spider Silk", item_value: 100 },
    { item_name: "Spidris Mandible", item_value: 450 },
    { item_name: "Spiked Iron Ball", item_value: 100 },
    { item_name: "Spirit Container (Fighting Spirit)", item_value: 40000 },
    { item_name: "Spite's Spirit", item_value: 840000 },
    { item_name: "Spitter Nose", item_value: 340 },
    { item_name: "Splintered Mitmah Gem", item_value: 225000 },
    { item_name: "Spooky Blue Eye", item_value: 95 },
    { item_name: "Srezz' Eye", item_value: 300 },
    { item_name: "Staff Piece", item_value: 560 },
    { item_name: "Star Herb", item_value: 15 },
    { item_name: "Stone Herb", item_value: 20 },
    { item_name: "Stone Wing", item_value: 120 },
    { item_name: "Stonerefiner's Skull", item_value: 100 },
    { item_name: "Strand of Medusa Hair", item_value: 600 },
    { item_name: "Strange Proto Matter", item_value: 300 },
    { item_name: "Strange Substance", item_value: 810 },
    { item_name: "Strange Symbol", item_value: 200 },
    { item_name: "Streaked Devourer Eyes", item_value: 500 },
    { item_name: "Streaked Devourer Legs", item_value: 600 },
    { item_name: "Streaked Devourer Maw", item_value: 400 },
    { item_name: "Striped Fur", item_value: 50 },
    { item_name: "Swamp Grass", item_value: 20 },
    { item_name: "Swampling Moss", item_value: 20 },
    { item_name: "Swarmer Antenna", item_value: 130 },
    { item_name: "Tail of Corruption", item_value: 240 },
    { item_name: "Tarantula Egg", item_value: 80 },
    { item_name: "Tarnished Rhino Figurine", item_value: 320 },
    { item_name: "Tattered Piece of Robe", item_value: 120 },
    { item_name: "Telescope Eye", item_value: 1600 },
    { item_name: "Tentacle of Tentugly", item_value: 27000 },
    { item_name: "Tentacle Piece", item_value: 5000 },
    { item_name: "Tentugly's Eye", item_value: 52000 },
    { item_name: "Tentugly's Jaws", item_value: 80000 },
    { item_name: "Terramite Eggs", item_value: 50 },
    { item_name: "Terramite Legs", item_value: 60 },
    { item_name: "Terramite Shell", item_value: 170 },
    { item_name: "Terrorbird Beak", item_value: 95 },
    { item_name: "The Handmaiden's Protector", item_value: 50000 },
    { item_name: "The Imperor's Trident", item_value: 50000 },
    { item_name: "The Plasmother's Remains", item_value: 50000 },
    { item_name: "Thick Fur", item_value: 150 },
    { item_name: "Thorn", item_value: 100 },
    { item_name: "Token of Love", item_value: 440000 },
    { item_name: "Tooth File", item_value: 60 },
    { item_name: "Tooth of Tazhadur", item_value: 10000 },
    { item_name: "Torn Shirt", item_value: 250 },
    { item_name: "Trapped Bad Dream Monster", item_value: 900 },
    { item_name: "Tremendous Tyrant Head", item_value: 930 },
    { item_name: "Tremendous Tyrant Shell", item_value: 740 },
    { item_name: "Troll Green", item_value: 25 },
    { item_name: "Trollroot", item_value: 50 },
    { item_name: "Tunnel Tyrant Head", item_value: 500 },
    { item_name: "Tunnel Tyrant Shell", item_value: 700 },
    { item_name: "Turtle Shell", item_value: 90 },
    { item_name: "Tusk", item_value: 100 },
    { item_name: "Two-Headed Turtle Heads", item_value: 460 },
    { item_name: "Undead Heart", item_value: 200 },
    { item_name: "Unholy Bone", item_value: 480 },
    { item_name: "Urmahlullu's Mane", item_value: 490000 },
    { item_name: "Urmahlullu's Paw", item_value: 245000 },
    { item_name: "Urmahlullu's Tail", item_value: 210000 },
    { item_name: "Utua's Poison", item_value: 230 },
    { item_name: "Vampire Dust", item_value: 100 },
    { item_name: "Vampire Teeth", item_value: 275 },
    { item_name: "Vampire's Cape Chain", item_value: 150 },
    { item_name: "Varnished Diremaw Brainpan", item_value: 750 },
    { item_name: "Varnished Diremaw Legs", item_value: 670 },
    { item_name: "Veal", item_value: 40 },
    { item_name: "Vemiath's Infused Basalt", item_value: 1000000 },
    { item_name: "Venison", item_value: 55 },
    { item_name: "Vexclaw Talon", item_value: 1100 },
    { item_name: "Vial of Hatred", item_value: 737000 },
    { item_name: "Vibrant Heart", item_value: 2100 },
    { item_name: "Vibrant Robe", item_value: 1200 },
    { item_name: "Violet Glass Plate", item_value: 2150 },
    { item_name: "Volatile Proto Matter", item_value: 300 },
    { item_name: "Wardragon Claw", item_value: 550 },
    { item_name: "Wardragon Tooth", item_value: 730 },
    { item_name: "Warmaster's Wristguards", item_value: 200 },
    { item_name: "Warwolf Fur", item_value: 30 },
    { item_name: "Waspoid Claw", item_value: 320 },
    { item_name: "Waspoid Wing", item_value: 190 },
    { item_name: "Weaver's Wandtip", item_value: 250 },
    { item_name: "Werebadger Claws", item_value: 160 },
    { item_name: "Werebadger Skull", item_value: 185 },
    { item_name: "Werebear Fur", item_value: 185 },
    { item_name: "Werebear Skull", item_value: 195 },
    { item_name: "Wereboar Hooves", item_value: 175 },
    { item_name: "Wereboar Tusk", item_value: 165 },
    { item_name: "Werecrocodile Tongue", item_value: 570 },
    { item_name: "Werefox Tail", item_value: 200 },
    { item_name: "Werehyaena Nose", item_value: 220 },
    { item_name: "Werehyaena Talisman", item_value: 350 },
    { item_name: "Werepanther Claw", item_value: 280 },
    { item_name: "Weretiger Tooth", item_value: 490 },
    { item_name: "Werewolf Fang", item_value: 180 },
    { item_name: "Werewolf Fur", item_value: 380 },
    { item_name: "White Piece of Cloth", item_value: 100 },
    { item_name: "Widow's Mandibles", item_value: 110 },
    { item_name: "Wild Flowers", item_value: 120 },
    { item_name: "Wimp Tooth Chain", item_value: 120 },
    { item_name: "Winged Tail", item_value: 800 },
    { item_name: "Winter Wolf Fur", item_value: 20 },
    { item_name: "Witch Broom", item_value: 60 },
    { item_name: "Withered Pauldrons", item_value: 850 },
    { item_name: "Withered Scalp", item_value: 900 },
    { item_name: "Wolf Paw", item_value: 70 },
    { item_name: "Wood", item_value: 5 },
    { item_name: "Wool", item_value: 15 },
    { item_name: "Worm Sponge", item_value: 4200 },
    { item_name: "Writhing Brain", item_value: 370000 },
    { item_name: "Writhing Heart", item_value: 185000 },
    { item_name: "Wyrm Scale", item_value: 400 },
    { item_name: "Wyvern Talisman", item_value: 265 },
    { item_name: "Yapunac Dagger", item_value: 240 },
    { item_name: "Yellow Piece of Cloth", item_value: 150 },
    { item_name: "Yielowax", item_value: 600 },
    { item_name: "Yirkas' Egg", item_value: 280 },
    { item_name: "Young Lich Worm", item_value: 25000 },
    { item_name: "Zaogun Flag", item_value: 600 },
    { item_name: "Zaogun Shoulderplates", item_value: 150 },
    { item_name: "Angelic Axe", item_value: 5000 },
    { item_name: "Blue Robe", item_value: 10000 },
    { item_name: "Bonelord Shield", item_value: 1200 },
    { item_name: "Boots of Haste", item_value: 30000 },
    { item_name: "Broadsword", item_value: 500 },
    { item_name: "Butcher's Axe", item_value: 18000 },
    { item_name: "Crown Armor", item_value: 12000 },
    { item_name: "Crown Helmet", item_value: 2500 },
    { item_name: "Crown Legs", item_value: 12000 },
    { item_name: "Crown Shield", item_value: 8000 },
    { item_name: "Crusader Helmet", item_value: 6000 },
    { item_name: "Dragon Lance", item_value: 9000 },
    { item_name: "Dragon Shield", item_value: 4000 },
    { item_name: "Earth Spike Sword", item_value: 1000 },
    { item_name: "Earth War Hammer", item_value: 1200 },
    { item_name: "Energy Spike Sword", item_value: 1000 },
    { item_name: "Energy War Hammer", item_value: 1200 },
    { item_name: "Fiery Spike Sword", item_value: 1000 },
    { item_name: "Fiery War Hammer", item_value: 1200 },
    { item_name: "Fire Axe", item_value: 8000 },
    { item_name: "Fire Sword", item_value: 4000 },
    { item_name: "Glorious Axe", item_value: 3000 },
    { item_name: "Guardian Shield", item_value: 2000 },
    { item_name: "Ice Rapier", item_value: 1000 },
    { item_name: "Icy Spike Sword", item_value: 1000 },
    { item_name: "Icy War Hammer", item_value: 1200 },
    { item_name: "Noble Armor", item_value: 900 },
    { item_name: "Obsidian Lance", item_value: 500 },
    { item_name: "Phoenix Shield", item_value: 16000 },
    { item_name: "Queen's Sceptre", item_value: 20000 },
    { item_name: "Royal Helmet", item_value: 30000 },
    { item_name: "Shadow Sceptre", item_value: 10000 },
    { item_name: "Spike Sword", item_value: 1000 },
    { item_name: "Thaian Sword", item_value: 16000 },
    { item_name: "War Hammer", item_value: 1200 },
    { item_name: "Axe Ring", item_value: 100 },
    { item_name: "Bronze Amulet", item_value: 50 },
    { item_name: "Club Ring", item_value: 100 },
    { item_name: "Elven Amulet", item_value: 100 },
    { item_name: "Garlic Necklace", item_value: 50 },
    { item_name: "Life Crystal", item_value: 50 },
    { item_name: "Magic Light Wand", item_value: 35 },
    { item_name: "Mind Stone", item_value: 100 },
    { item_name: "Orb", item_value: 750 },
    { item_name: "Power Ring", item_value: 50 },
    { item_name: "Stealth Ring", item_value: 200 },
    { item_name: "Stone Skin Amulet", item_value: 500 },
    { item_name: "Sword Ring", item_value: 100 },
    { item_name: "Wand of Cosmic Energy", item_value: 2000 },
    { item_name: "Wand of Decay", item_value: 1000 },
    { item_name: "Wand of Defiance", item_value: 6500 },
    { item_name: "Wand of Draconia", item_value: 1500 },
    { item_name: "Wand of Dragonbreath", item_value: 200 },
    { item_name: "Wand of Everblazing", item_value: 6000 },
    { item_name: "Wand of Inferno", item_value: 3000 },
    { item_name: "Wand of Starstorm", item_value: 3600 },
    { item_name: "Wand of Voodoo", item_value: 4400 },
    { item_name: "Wand of Vortex", item_value: 100 },

    {
        item_name: "Blue Gem",
        item_value: 5000
    },
    {
        item_name: "Golden Mug",
        item_value: 250
    },
    {
        item_name: "Green Gem",
        item_value: 5000
    },
    {
        item_name: "Red Gem",
        item_value: 1000
    },
    {
        item_name: "Violet Gem",
        item_value: 10000
    },
    {
        item_name: "Yellow Gem",
        item_value: 1000
    },
    {
        item_name: "Crunor Idol",
        item_value: 30000
    },
    {
        item_name: "Ancient Coin",
        item_value: 350
    },
    {
        item_name: "Black Pearl",
        item_value: 280
    },
    {
        item_name: "Blue Crystal Shard",
        item_value: 1500
    },
    {
        item_name: "Blue Crystal Splinter",
        item_value: 400
    },
    {
        item_name: "Brown Crystal Splinter",
        item_value: 400
    },
    {
        item_name: "Coral Brooch",
        item_value: 750
    },
    {
        item_name: "Cyan Crystal Fragment",
        item_value: 800
    },
    {
        item_name: "Dragon Figurine",
        item_value: 45000
    },
    {
        item_name: "Gemmed Figurine",
        item_value: 3500
    },
    {
        item_name: "Giant Emerald",
        item_value: 90000
    },
    {
        item_name: "Giant Ruby",
        item_value: 70000
    },
    {
        item_name: "Giant Sapphire",
        item_value: 50000
    },
    {
        item_name: "Giant Shimmering Pearl",
        item_value: 3000
    },
    {
        item_name: "Gold Ingot",
        item_value: 5000
    },
    {
        item_name: "Gold Nugget",
        item_value: 850
    },
    {
        item_name: "Green Crystal Fragment",
        item_value: 800
    },
    {
        item_name: "Green Crystal Shard",
        item_value: 1500
    },
    {
        item_name: "Green Crystal Splinter",
        item_value: 400
    },
    {
        item_name: "Onyx Chip",
        item_value: 500
    },
    {
        item_name: "Opal",
        item_value: 500
    },
    {
        item_name: "Ornate Locket",
        item_value: 18000
    },
    {
        item_name: "Prismatic Quartz",
        item_value: 450
    },
    {
        item_name: "Rainbow Quartz",
        item_value: 500
    },
    {
        item_name: "Red Crystal Fragment",
        item_value: 800
    },
    {
        item_name: "Small Amethyst",
        item_value: 200
    },
    {
        item_name: "Small Diamond",
        item_value: 300
    },
    {
        item_name: "Small Emerald",
        item_value: 250
    },
    {
        item_name: "Small Enchanted Amethyst",
        item_value: 200
    },
    {
        item_name: "Small Enchanted Emerald",
        item_value: 250
    },
    {
        item_name: "Small Enchanted Ruby",
        item_value: 250
    },
    {
        item_name: "Small Enchanted Sapphire",
        item_value: 250
    },
    {
        item_name: "Small Ruby",
        item_value: 250
    },
    {
        item_name: "Small Sapphire",
        item_value: 250
    },
    {
        item_name: "Small Topaz",
        item_value: 200
    },
    {
        item_name: "Tiger Eye",
        item_value: 350
    },
    {
        item_name: "Unicorn Figurine",
        item_value: 50000
    },
    {
        item_name: "Violet Crystal Shard",
        item_value: 1500
    },
    {
        item_name: "Watermelon Tourmaline (Fatia)",
        item_value: 30000
    },
    {
        item_name: "Watermelon Tourmaline (Lapidada)",
        item_value: 230000
    },
    {
        item_name: "Wedding Ring",
        item_value: 100
    },
    {
        item_name: "White Pearl",
        item_value: 160
    }

];
let ordens = JSON.parse(localStorage.getItem('ordensTibia') || '[]');

// Carregar valor salvo da Tibia Coin
const savedCoinValue = localStorage.getItem('tibiaCoinValue');
if (savedCoinValue !== null) tibiaCoinInput.value = savedCoinValue;

tibiaCoinInput.addEventListener('change', () => {
  const value = parseInt(tibiaCoinInput.value);
  if (!isNaN(value)) localStorage.setItem('tibiaCoinValue', value);
});

function salvarOrdens() {
  localStorage.setItem('ordensTibia', JSON.stringify(ordens));
}

function calcularTaxa(valorTotal) {
  const taxa = Math.floor(valorTotal * 0.02);
  return taxa < 20 ? 20 : taxa;
}

function getPrecoVenda(item) {
  const encontrado = itensArray.find(i => i.item_name === item);
  return encontrado ? parseInt(encontrado.item_value) : 0;
}

function renderOrdens() {
  tbody.innerHTML = '';
  const tibiaCoinValue = parseInt(localStorage.getItem('tibiaCoinValue')) || 1;

  const ordensParaExibir = [...ordens].reverse();

  ordensParaExibir.forEach((ordem, renderIndex) => {
    const index = ordens.length - 1 - renderIndex;

    const isFechada = ordem.fechada;
    const isCompleta = ordem.executado >= ordem.total;

    if (esconderFechadas && (isFechada || isCompleta)) return;

    const pendente = ordem.total - ordem.executado;
    const precoCompra = parseInt(ordem.valor) || 0;
    const precoVenda = getPrecoVenda(ordem.item);
    const valorEmpenhado = pendente * precoCompra;
    const valorEmpenhadoReais = (valorEmpenhado / tibiaCoinValue) * tcVendaReais;

    const valorTotalOrdem = ordem.total * precoCompra;
    const taxaTotal = calcularTaxa(valorTotalOrdem);
    const lucroUnidade = precoVenda - precoCompra;
    const retornoObtido = (lucroUnidade * ordem.executado) - taxaTotal;
    const retornoReais = (retornoObtido / tibiaCoinValue) * tcVendaReais;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${ordem.item}</td>
      <td>${precoCompra}</td>
      <td>${precoVenda}</td>
      <td>${ordem.total}</td>
      <td>${ordem.executado}</td>
      <td>${valorEmpenhado}</td>
      <td>R$ ${valorEmpenhadoReais.toFixed(2)}</td>
      <td>${retornoObtido}</td>
      <td>R$ ${retornoReais.toFixed(2)}</td>
      <td>
        ${(!isFechada && !isCompleta) ? `
          <input type="number" id="exec-${index}" min="1" max="${pendente}" style="width: 60px;" />
          <button onclick="executar(${index})">Executar</button>
        ` : ''}
      </td>
      <td>
        ${(!isFechada && !isCompleta) ? `
          <button onclick="fecharOrdem(${index})">Fechar</button>
        ` : ''}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function executar(index) {
  if (ordens[index].fechada) return;
  const input = document.getElementById(`exec-${index}`);
  const qtd = parseInt(input.value);
  if (!qtd || qtd < 1) return;

  ordens[index].executado += qtd;
  if (ordens[index].executado > ordens[index].total)
    ordens[index].executado = ordens[index].total;

  salvarOrdens();
  renderOrdens();
}

function fecharOrdem(index) {
  if (confirm("Deseja realmente fechar essa ordem?")) {
    ordens[index].fechada = true;
    salvarOrdens();
    renderOrdens();
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const item = inputItem.value.trim();
  const qtd = parseInt(inputQtd.value);
  const valor = parseInt(inputValor.value);
  if (item && qtd > 0 && valor >= 0) {
    ordens.push({ item, total: qtd, executado: 0, valor, fechada: false });
    salvarOrdens();
    renderOrdens();
    form.reset();
  }
});

document.getElementById('toggleFechadas').addEventListener('click', (e) => {
  esconderFechadas = !esconderFechadas;
  e.target.textContent = esconderFechadas ? "Mostrar" : "Esconder";
  renderOrdens();
});

inputItem.addEventListener('input', () => {
  const termo = inputItem.value.trim().toLowerCase();
  listaSugestoes.innerHTML = '';

  if (termo.length === 0) {
    inputValor.placeholder = "";
    return;
  }

  const filtrados = itensArray
    .filter(item => item.item_name.toLowerCase().startsWith(termo))
    .slice(0, 20);

  filtrados.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.item_name;
    li.addEventListener('click', () => {
      inputItem.value = item.item_name;
      inputValor.placeholder = item.item_value;
      listaSugestoes.innerHTML = '';
    });
    listaSugestoes.appendChild(li);
  });

  const sugestaoExata = itensArray.find(item =>
    item.item_name.toLowerCase() === termo
  );
  inputValor.placeholder = sugestaoExata ? sugestaoExata.item_value : '';
});

inputValor.addEventListener('input', () => {
  const preco = parseFloat(inputValor.value);
  const tc = parseFloat(localStorage.getItem('tibiaCoinValue')) || 1;

  if (!isNaN(preco) && preco > 0) {
    const goldPorReal = tc / tcVendaReais;
    const quantidade = Math.ceil(goldPorReal / preco);
    inputQtd.placeholder = `~ ${quantidade} unid. = R$1`;
  } else {
    inputQtd.placeholder = '';
  }
});

document.addEventListener('click', (e) => {
  if (!listaSugestoes.contains(e.target) && e.target !== inputItem) {
    listaSugestoes.innerHTML = '';
  }
});

renderOrdens();