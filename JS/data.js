
const destinations = [
  {
    id: 1,
    name: "Paris",
    continent: "Europe",
    region: "France",
    description: "The city of light, known for its cafe culture, art museums, and iconic architecture.",
    attractions: ["Eiffel Tower", "Louvre", "Seine River"],
    costs: { budget: "$80/day", moderate: "$200/day", luxury: "$500/day" },
    image: "assets/Images/paris.jpg",
    category: "cultural"
  },
  {
    id: 2,
    name: "Tokyo",
    continent: "Asia",
    region: "Japan",
    description: "A bustling metropolis blending ultramodern neon landscapes with ancient temples.",
    attractions: ["Senso-ji Temple", "Shibuya Crossing", "Tokyo Skytree"],
    costs: { budget: "$70/day", moderate: "$150/day", luxury: "$400/day" },
    image: "assets/Images/tokyo.jpg",
    category: "modern"
  },
  {
    id: 3,
    name: "Banff",
    continent: "North America",
    region: "Canada",
    description: "A resort town nestled in the Rocky Mountains, famous for its glacial lakes and outdoor sports.",
    attractions: ["Lake Louise", "Banff Gondola", "Moraine Lake"],
    costs: { budget: "$90/day", moderate: "$250/day", luxury: "$600/day" },
    image: "assets/Images/banff.jpg",
    category: "nature"
  },
  {
    id: 4,
    name: "Rome",
    continent: "Europe",
    region: "Italy",
    description: "The Eternal City, featuring a sprawling ancient history side-by-side with vibrant street life.",
    attractions: ["Colosseum", "Vatican City", "Trevi Fountain"],
    costs: { budget: "$75/day", moderate: "$180/day", luxury: "$450/day" },
    image: "assets/Images/rome.jpg",
    category: "historical"
  },
  {
    id: 5,
    name: "Bali",
    continent: "Asia",
    region: "Indonesia",
    description: "A tropical paradise celebrated for its forested volcanic mountains, iconic rice paddies, and beaches.",
    attractions: ["Ubud Monkey Forest", "Uluwatu Temple", "Mount Batur"],
    costs: { budget: "$30/day", moderate: "$80/day", luxury: "$250/day" },
    image: "assets/Images/bali.jpg",
    category: "relaxation"
  },
  {
    id: 6,
    name: "Cape Town",
    continent: "Africa",
    region: "South Africa",
    description: "A port city on South Africa's southwest coast, sitting on a peninsula beneath the imposing Table Mountain.",
    attractions: ["Table Mountain", "Cape of Good Hope", "Robben Island"],
    costs: { budget: "$50/day", moderate: "$120/day", luxury: "$350/day" },
    image: "assets/Images/capetown.jpg",
    category: "adventure"
  },
  {
    id: 7,
    name: "New York City",
    continent: "North America",
    region: "USA",
    description: "The city that never sleeps, featuring globally influential art, fashion, and financial districts.",
    attractions: ["Central Park", "Times Square", "Statue of Liberty"],
    costs: { budget: "$100/day", moderate: "$300/day", luxury: "$800/day" },
    image: "assets/Images/nyc.jpg",
    category: "modern"
  },
  {
    id: 8,
    name: "Cusco",
    continent: "South America",
    region: "Peru",
    description: "A city in the Peruvian Andes, once capital of the Inca Empire and gateway to Machu Picchu.",
    attractions: ["Machu Picchu", "Sacred Valley", "Plaza de Armas"],
    costs: { budget: "$40/day", moderate: "$100/day", luxury: "$300/day" },
    image: "assets/Images/cusco.jpg",
    category: "historical"
  },
  {
    id: 9,
    name: "Santorini",
    continent: "Europe",
    region: "Greece",
    description: "A picturesque island known for its whitewashed, cubiform houses clinging to cliffs above an underwater caldera.",
    attractions: ["Oia Sunsets", "Red Beach", "Akrotiri Ruins"],
    costs: { budget: "$80/day", moderate: "$220/day", luxury: "$600/day" },
    image: "assets/Images/santorini.jpg",
    category: "relaxation"
  },
  {
    id: 10,
    name: "Queenstown",
    continent: "Oceania",
    region: "New Zealand",
    description: "The adventure capital of the world, sitting on the shores of the South Island's Lake Wakatipu.",
    attractions: ["Milford Sound", "Bungee Jumping", "Skyline Gondola"],
    costs: { budget: "$80/day", moderate: "$200/day", luxury: "$500/day" },
    image: "assets/Images/queenstown.jpg",
    category: "adventure"
  },
  {
    id: 11,
    name: "Marrakech",
    continent: "Africa",
    region: "Morocco",
    description: "A former imperial city in western Morocco, home to mosques, palaces, and bustling souks.",
    attractions: ["Jemaa el-Fnaa", "Majorelle Garden", "Bahia Palace"],
    costs: { budget: "$40/day", moderate: "$110/day", luxury: "$350/day" },
    image: "assets/Images/marrakech.jpg",
    category: "cultural"
  },
  {
    id: 12,
    name: "Dubai",
    continent: "Asia",
    region: "United Arab Emirates",
    description: "A city known for luxury shopping, ultramodern architecture, and a lively nightlife scene.",
    attractions: ["Burj Khalifa", "Dubai Mall", "Palm Jumeirah"],
    costs: { budget: "$90/day", moderate: "$250/day", luxury: "$700/day" },
    image: "assets/Images/dubai.jpg",
    category: "modern"
  },
  {
    id: 13,
    name: "Reykjavik",
    continent: "Europe",
    region: "Iceland",
    description: "The coastal capital of Iceland, serving as the perfect jumping-off point for viewing the Northern Lights and geothermal spas.",
    attractions: ["Blue Lagoon", "Golden Circle", "Hallgrímskirkja"],
    costs: { budget: "$120/day", moderate: "$280/day", luxury: "$650/day" },
    image: "assets/Images/reykjavik.jpg",
    category: "nature"
  },
  {
    id: 14,
    name: "Rio de Janeiro",
    continent: "South America",
    region: "Brazil",
    description: "A vibrant seaside city in Brazil, famed for its Copacabana beaches, Carnival festival, and iconic monuments.",
    attractions: ["Christ the Redeemer", "Sugarloaf Mountain", "Copacabana Beach"],
    costs: { budget: "$45/day", moderate: "$130/day", luxury: "$350/day" },
    image: "assets/Images/rio.jpg",
    category: "cultural"
  },
  {
    id: 15,
    name: "Kyoto",
    continent: "Asia",
    region: "Japan",
    description: "The historical heart of Japan, featuring thousands of classical Buddhist temples, Shinto shrines, and traditional wooden houses.",
    attractions: ["Fushimi Inari Taisha", "Kinkaku-ji", "Arashiyama Bamboo Grove"],
    costs: { budget: "$60/day", moderate: "$160/day", luxury: "$450/day" },
    image: "assets/Images/kyoto.jpg",
    category: "historical"
  }
];
