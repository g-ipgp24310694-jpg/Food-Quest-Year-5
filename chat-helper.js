'use strict';
/* Mr. Wan Thuthri: an OFFLINE, guided question-answer helper for Year 5.
   It uses a curated FAQ and food dictionary. It is NOT a generative AI model.
   Pupil messages are not uploaded or saved. */
(() => {
  const byId = id => document.getElementById(id);
  const FOODS = [
    {name:'apple',aliases:['apples'],group:'fruit',fact:'Apples provide fibre and are a great fruit snack.'},
    {name:'banana',aliases:['bananas'],group:'fruit',fact:'Bananas are fruits that provide energy and potassium.'},
    {name:'orange',aliases:['oranges'],group:'fruit',fact:'Oranges are fruits that provide vitamin C.'},
    {name:'strawberry',aliases:['strawberries'],group:'fruit',fact:'Strawberries are fruits with vitamins and fibre.'},
    {name:'mango',aliases:['mangoes','mangos'],group:'fruit',fact:'Mangoes are fruits that contain vitamins.'},
    {name:'papaya',aliases:['papayas'],group:'fruit',fact:'Papaya is a fruit that contains fibre and vitamins.'},
    {name:'pineapple',aliases:['pineapples'],group:'fruit',fact:'Pineapple is a tropical fruit.'},
    {name:'watermelon',aliases:['watermelons'],group:'fruit',fact:'Watermelon is a fruit with a high water content.'},
    {name:'grape',aliases:['grapes'],group:'fruit',fact:'Grapes are fruits; whole grapes should be cut appropriately for young children.'},
    {name:'kiwi',aliases:['kiwifruit','kiwis'],group:'fruit',fact:'Kiwi is a fruit that provides vitamin C.'},
    {name:'pear',aliases:['pears'],group:'fruit',fact:'Pears are fruits that provide fibre.'},
    {name:'guava',aliases:['guavas'],group:'fruit',fact:'Guava is a tropical fruit rich in vitamin C.'},
    {name:'dragon fruit',aliases:['dragonfruit','pitaya'],group:'fruit',fact:'Dragon fruit is a tropical fruit with tiny seeds.'},
    {name:'avocado',aliases:['avocados'],group:'fruit',fact:'Avocado is botanically a fruit. It also contains healthy fats.'},
    {name:'tomato',aliases:['tomatoes'],group:'fruit',fact:'Botanically, a tomato is a fruit because it develops from a flower and contains seeds. In cooking, people often use it as a vegetable.',special:true},
    {name:'cucumber',aliases:['cucumbers'],group:'vegetable',fact:'In cooking and nutrition, cucumber is usually treated as a vegetable. Botanically, it is a fruit because it contains seeds.',special:true},
    {name:'carrot',aliases:['carrots'],group:'vegetable',fact:'Carrots are vegetables containing beta-carotene, which the body can use to make vitamin A.'},
    {name:'broccoli',aliases:[],group:'vegetable',fact:'Broccoli is a vegetable that provides fibre and vitamins.'},
    {name:'spinach',aliases:[],group:'vegetable',fact:'Spinach is a leafy green vegetable.'},
    {name:'cabbage',aliases:['cabbages'],group:'vegetable',fact:'Cabbage is a leafy vegetable.'},
    {name:'lettuce',aliases:[],group:'vegetable',fact:'Lettuce is a leafy vegetable often used in salads.'},
    {name:'cauliflower',aliases:[],group:'vegetable',fact:'Cauliflower is a vegetable in the same family as broccoli.'},
    {name:'long bean',aliases:['long beans','green bean','green beans'],group:'vegetable',fact:'Long beans are commonly grouped with vegetables in meals.'},
    {name:'potato',aliases:['potatoes'],group:'vegetable',fact:'Potatoes are starchy vegetables that provide carbohydrates. Cooking method and portions matter.',special:true},
    {name:'rice',aliases:['white rice','brown rice'],group:'grain',fact:'Rice is a grain and a source of carbohydrates. Brown rice provides more fibre than white rice.'},
    {name:'bread',aliases:['wholemeal bread','whole wheat bread','white bread'],group:'grain',fact:'Bread is made mainly from grains such as wheat. Wholegrain bread usually provides more fibre.'},
    {name:'oats',aliases:['oat','oatmeal'],group:'grain',fact:'Oats are whole grains that provide fibre.'},
    {name:'pasta',aliases:['spaghetti','macaroni'],group:'grain',fact:'Pasta is usually made from wheat, which is a grain.'},
    {name:'noodles',aliases:['noodle','mee','meehoon','rice noodles'],group:'grain',fact:'Many noodles are made from wheat or rice and belong with grain foods.'},
    {name:'cereal',aliases:['cereals'],group:'grain',fact:'Breakfast cereal is made from grains. Some types contain a lot of added sugar, so check the label.'},
    {name:'chapati',aliases:['roti chapati'],group:'grain',fact:'Chapati is a flatbread usually made from wheat flour.'},
    {name:'corn',aliases:['sweetcorn','maize'],group:'grain',fact:'Corn is botanically a grain, though sweetcorn is often grouped with starchy vegetables in meals.',special:true},
    {name:'fish',aliases:['salmon','tuna','sardine','sardines','ikan'],group:'protein',fact:'Fish is a protein food that helps the body grow and repair tissues.'},
    {name:'chicken',aliases:['chicken breast'],group:'protein',fact:'Chicken is a protein food.'},
    {name:'egg',aliases:['eggs'],group:'protein',fact:'Eggs are protein foods.'},
    {name:'tofu',aliases:['bean curd'],group:'protein',fact:'Tofu is made from soybeans and is a plant-based protein food.'},
    {name:'tempeh',aliases:['tempe'],group:'protein',fact:'Tempeh is made from fermented soybeans and is a protein food.'},
    {name:'beans',aliases:['bean','kidney beans','red beans','chickpeas','lentils'],group:'protein',fact:'Beans and lentils provide plant protein and fibre.'},
    {name:'beef',aliases:['meat','lean meat'],group:'protein',fact:'Beef is a protein food; choosing a variety of protein sources is helpful.'},
    {name:'prawns',aliases:['prawn','shrimp'],group:'protein',fact:'Prawns are seafood and a source of protein.'},
    {name:'nuts',aliases:['almonds','peanuts','cashews'],group:'protein',fact:'Nuts provide plant protein and healthy fats. Check for allergies.'},
    {name:'milk',aliases:['cow milk','low fat milk'],group:'dairy',fact:'Milk is a dairy food that provides calcium and protein.'},
    {name:'cheese',aliases:[],group:'dairy',fact:'Cheese is made from milk and is part of the dairy group.'},
    {name:'yoghurt',aliases:['yogurt','plain yogurt','plain yoghurt'],group:'dairy',fact:'Yoghurt is made from milk. Plain yoghurt usually has less added sugar than sweetened versions.'},
    {name:'water',aliases:['plain water'],group:'drink',fact:'Plain water helps keep us hydrated and has no added sugar.'},
    {name:'soda',aliases:['soft drink','soft drinks','cola','fizzy drink','fizzy drinks','sugary drink','sugary drinks'],group:'treat',fact:'Sugary soft drinks are better as occasional treats. Plain water is a good everyday drink.'},
    {name:'candy',aliases:['sweets','sweet','lollipop','lollipops'],group:'treat',fact:'Candy often contains a lot of added sugar, so it is best enjoyed less often.'},
    {name:'chocolate',aliases:['chocolates'],group:'treat',fact:'Chocolate can be enjoyed sometimes; many varieties contain added sugar.'},
    {name:'doughnut',aliases:['donut','donuts','doughnuts'],group:'treat',fact:'Doughnuts are usually sweet treats that can be enjoyed occasionally.'},
    {name:'cake',aliases:['cakes','cupcake','cupcakes'],group:'treat',fact:'Cake often has added sugar and is usually a sometimes treat.'},
    {name:'ice cream',aliases:['icecream'],group:'treat',fact:'Ice cream is usually a sweet treat. Portion and frequency matter.'},
    {name:'fries',aliases:['french fries','chips','potato chips','crisps'],group:'treat',fact:'Fried potato snacks can contain a lot of salt and fat, so enjoy them less often.'},
    {name:'burger',aliases:['hamburger','burgers','hamburgers'],group:'mixed',fact:'A burger is a mixed meal. It may contain bread, protein and vegetables. Ingredients, portion and cooking method matter.'},
    {name:'pizza',aliases:['pizzas'],group:'mixed',fact:'Pizza is a mixed food with a grain-based crust, and often cheese, vegetables or protein toppings.'},
    {name:'fruit salad',aliases:['fruits salad'],group:'mixed',fact:'Fruit salad is mainly fruit. It can be a nutritious snack, especially without lots of added sugar.'},
    {name:'sandwich',aliases:['sandwiches'],group:'mixed',fact:'A sandwich may contain grains, vegetables and protein. The ingredients affect how balanced it is.'},
    {name:'nasi lemak',aliases:[],group:'mixed',fact:'Nasi lemak is a mixed meal with rice and different sides. Balance the portion and add vegetables when possible.'}
  ];
  const GROUP_DISPLAY = {fruit:'fruit',vegetable:'vegetable',grain:'grain',protein:'protein food',dairy:'dairy food',treat:'sometimes treat',mixed:'mixed dish',drink:'drink'};
  const aliasMap = new Map();
  for(const food of FOODS){for(const word of [food.name,...food.aliases])aliasMap.set(word,food);}
  const aliasesByLength = [...aliasMap.keys()].sort((a,b)=>b.length-a.length);
  let lastCategory = null;
  let openedBefore = false;

  function clean(text){return String(text).toLowerCase().normalize('NFKC').replace(/[’‘]/g,"'").replace(/[?!.:,;()"“”]/g,' ').replace(/\s+/g,' ').trim();}
  function findFood(phrase){const value=clean(phrase).replace(/^(a|an|the|some)\s+/,'');if(aliasMap.has(value))return aliasMap.get(value);for(const alias of aliasesByLength){if(value===alias||value.startsWith(`${alias} `)||value.endsWith(` ${alias}`))return aliasMap.get(alias);}return null;}
  function canonicalCategory(value){const v=clean(value);if(/^fruit/.test(v))return'fruit';if(/^vegetable/.test(v)||/^veggie/.test(v))return'vegetable';if(/^grain/.test(v)||/^cereal/.test(v))return'grain';if(/^protein/.test(v))return'protein';if(/^dairy/.test(v)||/^milk product/.test(v))return'dairy';if(/^unhealthy/.test(v)||/^junk/.test(v))return'unhealthy';if(/^healthy/.test(v))return'healthy';return null;}
  function foodAnswer(food,target){const group=food.group,pretty=GROUP_DISPLAY[group];if(!target){lastCategory=group;return `${food.name[0].toUpperCase()+food.name.slice(1)} is ${group==='mixed'?'a mixed dish':group==='treat'?'usually a sometimes treat':group==='drink'?'a drink':`in the ${pretty} group`}. ${food.fact}`;}
    lastCategory=target;
    if(target==='healthy'||target==='unhealthy'){
      if(group==='treat')return target==='healthy'?`Not usually as an everyday choice. ${food.fact} No food needs to be called “bad”; balance matters.`:`It is often a less-healthy, sometimes treat. ${food.fact}`;
      if(group==='mixed')return `${food.name[0].toUpperCase()+food.name.slice(1)} can be part of a balanced diet depending on its ingredients and portion. ${food.fact}`;
      if(group==='drink')return `Plain water is a healthy everyday drink. ${food.fact}`;
      return target==='healthy'?`Yes, ${food.name} can be part of a healthy, balanced diet! ${food.fact}`:`Not generally. ${food.name} belongs to the ${pretty} group and can be part of balanced meals. ${food.fact}`;
    }
    if(food.name==='tomato'&&['fruit','vegetable'].includes(target))return `Great question! ${food.fact}`;
    if(food.name==='cucumber'&&['fruit','vegetable'].includes(target))return `Good thinking! ${food.fact}`;
    if(food.name==='corn'&&['grain','vegetable'].includes(target))return `Nice question! ${food.fact}`;
    if(group==='mixed')return `Not exactly. ${food.fact} It does not belong to just one food group.`;
    if(group==='treat')return `No, ${food.name} is usually a sometimes treat, not a ${target} food. ${food.fact}`;
    if(group==='drink'&&target!=='dairy')return `No, ${food.name} is a drink, not a ${target}. ${food.fact}`;
    if(group===target)return `Yes! ${food.name[0].toUpperCase()+food.name.slice(1)} belongs to the ${pretty} group. ${food.fact}`;
    return `Not quite. ${food.name[0].toUpperCase()+food.name.slice(1)} is usually in the ${pretty} group, not the ${target} group. ${food.fact}`;
  }
  function explainFoodQuery(text){
    let m=text.match(/^(?:is|are)\s+(.+?)\s+(?:(?:a|an|the|part of the|in the|from the)\s+)?(fruits?|vegetables?|veggies|grains?|proteins?|dairy(?:\s+(?:food|product))?|healthy(?:\s+food)?|unhealthy(?:\s+food)?|junk\s+food)$/);
    if(m){const target=canonicalCategory(m[2]),food=findFood(m[1]);if(food)return foodAnswer(food,target);return `I'm not sure which food “${m[1].replace(/^(?:a|an|the)\s+/,'')}” is. Try another food, such as apple, rice, carrot, fish, milk, or tomato.`;}
    m=text.match(/^(?:what|which)\s+(?:food\s+)?group\s+(?:is|does)\s+(.+?)(?:\s+belong\s+to)?$/)||text.match(/^(?:where|which\s+group)\s+does\s+(.+?)\s+belong(?:\s+to)?$/);
    if(m){const food=findFood(m[1]);return food?foodAnswer(food,null):`I'm not sure yet. Please try asking “Is rice a grain?” or “Which food group is fish?”` ;}
    m=text.match(/^(?:is|are)\s+(.+?)\s+(?:good|bad|healthy|unhealthy)(?:\s+for\s+(?:me|you|us))?$/);
    if(m){const food=findFood(m[1]);return food?foodAnswer(food,text.includes('unhealthy')||text.includes('bad')?'unhealthy':'healthy'):null;}
    m=text.match(/^(?:what\s+about|how\s+about)\s+(.+)$/);
    if(m){const food=findFood(m[1]);return food?foodAnswer(food,['fruit','vegetable','grain','protein','dairy'].includes(lastCategory)?lastCategory:null):null;}
    m=text.match(/^(?:what\s+is|tell\s+me\s+about)\s+(.+)$/);
    if(m){const food=findFood(m[1]);return food?foodAnswer(food,null):null;}
    if(/^(?:can|should)\s+(?:i|we)\s+eat\s+/.test(text)){const food=findFood(text.replace(/^(?:can|should)\s+(?:i|we)\s+eat\s+/,'').replace(/\s+(?:every\s+day|daily|often)$/,''));if(food)return `Most foods can fit into a balanced diet. ${food.fact} If you have a food allergy or special diet, ask a trusted adult.`;}
    return null;
  }

  function faqAnswer(text){
    if(/^(hi|hello|hey|good morning|good afternoon|good evening|assalamualaikum)$/.test(text))return `Hello, young chef! 👋 I'm Mr. Wan Thuthri, your Food & Health helper. Ask me “Is rice a grain?” or “How do I write a recipe?”`;
    if(/^(thank you|thanks|thankyou|tq|terima kasih)$/.test(text))return `You're very welcome! 🌟 Keep asking questions and learning.`;
    if(/^(bye|goodbye|see you)$/.test(text))return `See you next time, Food Hero! 🍓`;
    if(/(?:your name|who are you|are you ai|are you real)/.test(text))return `My name is Mr. Wan Thuthri! 🤓 I'm a guided, offline classroom helper with prepared answers about foods, recipes, and Year 5 English. I'm not a live generative AI.`;
    if(/(?:password|teacher login|teacher account|unlock teacher|hack)/.test(text))return `The teacher area is for teachers. Please ask your teacher for help; I cannot provide access information.`;
    if(/(?:my address|my phone|my password|personal information|secret information)/.test(text))return `Please don't share your address, phone number, passwords or other private details here. Ask a trusted adult if you need help.`;
    if(/(?:what is healthy food|what are healthy foods|define healthy food|makanan sihat|what makes food healthy)/.test(text))return `Healthy foods help our bodies grow and work well. Examples include fruits, vegetables, whole grains, and a variety of protein foods. A healthy diet is about balance, variety, and sensible portions. 🥦🍎`;
    if(/(?:what is unhealthy food|what are unhealthy foods|define unhealthy food|makanan tidak sihat|junk food|less healthy food)/.test(text))return `Less-healthy foods are often high in added sugar, salt, or unhealthy fats, such as sugary drinks, sweets, or many fried snacks. They can be “sometimes treats”. No single food makes someone unhealthy — eating patterns matter. 🍬`;
    if(/(?:what is a balanced (?:meal|diet)|balanced plate|healthy plate|suku suku separuh|pinggan sihat)/.test(text))return `Malaysia's “Suku Suku Separuh” Healthy Plate idea is easy: fill about HALF your plate with vegetables and fruit, ONE QUARTER with rice or other grain/starchy foods, and ONE QUARTER with protein foods such as fish, eggs, beans, or chicken. Choose plain water, too! 🥗`;
    if(/(?:what are food groups|name (?:the |five |5 )?food groups|different food groups|types of food groups|what is a food group)/.test(text))return `Food groups help us sort foods by what they provide. In our lesson, we use: 🍎 fruit, 🥦 vegetables, 🍞 grains, 🐟 protein foods, and 🥛 dairy foods. Some meals contain foods from several groups.`;
    if(/(?:give me|name|list|examples of|example of)\s+(?:three|3|some|five|5)?\s*(?:healthy foods|healthy food)/.test(text))return `Here are five examples: apple 🍎, carrot 🥕, broccoli 🥦, oats 🥣, and fish 🐟. Try to eat a variety of food groups.`;
    if(/(?:give me|name|list|examples of|example of)\s+(?:three|3|some|five|5)?\s*(?:fruits?|vegetables?|grains?|proteins?)/.test(text)){
      if(/fruit/.test(text))return `Fruit examples: apple, banana, papaya, orange, mango, and watermelon. 🍉`;
      if(/vegetable/.test(text))return `Vegetable examples: carrot, spinach, broccoli, cabbage, and long beans. 🥦`;
      if(/grain/.test(text))return `Grain examples: rice, bread, oats, pasta, and noodles. Wholegrain choices often provide more fibre. 🍚`;
      return `Protein food examples: fish, chicken, egg, tofu, tempeh, and beans. 🐟`;
    }
    if(/(?:what is a fruit|what are fruits|fruit vs vegetable|difference between fruit and vegetable)/.test(text))return `In everyday meals, fruits include apple, mango, and banana. Botanically, a fruit develops from a flower and usually contains seeds. That is why a tomato is a botanical fruit, even though we cook it like a vegetable! 🍅`;
    if(/(?:what is a vegetable|what are vegetables)/.test(text))return `Vegetables are plant foods such as carrots, spinach, broccoli, and cabbage. They provide vitamins, minerals, and fibre. Some foods, like tomato, are used as vegetables in cooking but are botanical fruits. 🥕`;
    if(/(?:what is a grain|what are grains|what is carbohydrate|what are carbohydrates|what is carbs)/.test(text))return `Grains include rice, oats, wheat, and foods made from them, such as bread or noodles. They provide carbohydrates, which our bodies use for energy. Wholegrains often provide more fibre. 🍚`;
    if(/(?:what is protein|what are proteins|why do we need protein)/.test(text))return `Protein helps our bodies grow and repair tissues. You can find it in fish, chicken, eggs, tofu, tempeh, beans, and nuts. 💪`;
    if(/(?:what is dairy|what are dairy foods|is milk dairy)/.test(text))return `Dairy foods are made from milk, such as yoghurt and cheese. They provide nutrients including calcium and protein. 🥛`;
    if(/(?:what is fibre|what is fiber|why is fibre important)/.test(text))return `Fibre helps our digestive system work well. Fruits, vegetables, beans, and wholegrains are good sources. 🌾`;
    if(/(?:what are vitamins|why vitamins|what is vitamin)/.test(text))return `Vitamins are nutrients our bodies need in small amounts to work well. Different fruits and vegetables provide different vitamins, so variety is important. 🍊`;
    if(/(?:why (?:drink|choose) water|why is water important|water vs soda|water better than soda|what should i drink)/.test(text))return `Water helps our bodies stay hydrated. It is a great everyday choice because it has no added sugar. Sugary drinks like soda are best enjoyed less often. 💧`;
    if(/(?:why (?:limit|avoid|reduce) sugar|too much sugar|sugary drinks|are sweets unhealthy)/.test(text))return `Too much added sugar is not good for our teeth and overall health. Enjoy sweet treats less often, and choose plain water and whole fruit regularly. 🍬`;
    if(/(?:what is an ingredient|what are ingredients|ingredients vs steps|what is recipe ingredient)/.test(text))return `An ingredient is a food you use to make a dish, such as apple, banana, or yoghurt. A recipe STEP tells you what to do, such as “Cut the apple.” 🍎`;
    if(/(?:how (?:do|can) (?:i|we) (?:write|make|create) (?:a |my )?(?:healthy )?recipe|how to write a recipe|help me write a recipe|make a fruit salad)/.test(text))return `Let's make YOUR recipe! 📝 I won't write the answers for you. Here are some clues:
1. Think of a creative title for your dish.
2. Choose at least 3 ingredients from the Chef's Word Bank, or use your own ideas.
3. Plan what happens first, next, then, and finally. Pick action words such as wash, mix, or serve — but decide what to do with them yourself.
4. Write your own four instructions, then use the checklist in Recipe Studio.`;
    if(/(?:what are sequence words|sequence words|first next then finally|how to use sequence words|order of steps)/.test(text))return `Sequence words help put actions in order: FIRST (beginning), NEXT (second), THEN (after that), and FINALLY (last step). You can see them beside the four empty step boxes in Recipe Studio. Choose your own actions from the word bank! 🔢`;
    if(/(?:what is an instruction|imperative verb|action verb|recipe verbs|verbs for recipes)/.test(text))return `Recipe instructions often start with action verbs: wash, peel, cut, chop, mix, pour, add, and serve. For example: “Mix the fruit gently.” 🥣`;
    if(/(?:present simple question|present simple interrogative|how to ask a question|do and does question|question with do|question with does)/.test(text))return `In present simple questions, use “Do” with I/you/we/they and “Does” with he/she/it. Examples: “Do you eat vegetables?” and “Does she like mangoes?” ❓`;
    if(/(?:how to improve my recipe|check my recipe|recipe checklist|is my recipe good)/.test(text))return `Use this checklist: ✅ clear recipe title, ✅ at least 3 ingredients, ✅ four complete instructions, ✅ First/Next/Then/Finally in order, ✅ capital letters and full stops. You can check your draft in Recipe Studio!`;
    if(/(?:why wash (?:fruit|vegetables|hands)|wash fruit before eating)/.test(text))return `Washing your hands and rinsing fresh fruit and vegetables with clean water helps remove dirt. Ask an adult for help when using sharp tools. 🧼`;
    if(/(?:i don't understand|i do not understand|help me|what can you do|suggest questions|what should i ask)/.test(text))return `No worries! 🌟 Try asking: “Is banana a fruit?”, “Which food group is rice?”, “What is a balanced meal?”, “What are sequence words?”, or “How do I write a healthy recipe?”`;
    return null;
  }

  function answerQuestion(raw){const text=clean(raw);if(!text)return `Please type a question, young chef!`;
    const foodReply=explainFoodQuery(text);if(foodReply)return foodReply;
    const faqReply=faqAnswer(text);if(faqReply)return faqReply;
    if(text.length<4)return `Could you tell me a little more? For example, “Is an apple a fruit?”`;
    return `That's an interesting question! 🤔 I'm best at food groups, balanced meals, healthy choices, and recipe English. Try asking “Is rice a grain?”, “What is a balanced meal?”, or “How do I write a recipe?” For other topics, ask your teacher.`;
  }

  function appendMessage(role,body){const root=byId('chatMessages');const row=document.createElement('div');row.className=`chat-message ${role}`;if(role==='bot'){const img=document.createElement('img');img.className='chat-mini-avatar';img.src='assets/mr-wan-thuthri.svg';img.alt='';row.appendChild(img);}const bubble=document.createElement('div');bubble.className='chat-bubble';bubble.textContent=body;row.appendChild(bubble);root.appendChild(row);while(root.children.length>50)root.removeChild(root.firstChild);root.scrollTop=root.scrollHeight;}
  function resetConversation(){lastCategory=null;byId('chatMessages').replaceChildren();appendMessage('bot',`Hello, Food Hero! 👋 I'm Mr. Wan Thuthri. Ask me about fruits, vegetables, grains, healthy food, or writing recipes. For example: “Is rice a grain?”`);}
  function ask(raw){const question=String(raw).trim();if(!question)return;if(question.length>200){appendMessage('bot','Please keep your question shorter than 200 characters.');return;}appendMessage('user',question);appendMessage('bot',answerQuestion(question));}
  function openChat(){byId('chatPanel').classList.remove('hidden');byId('chatFab').setAttribute('aria-expanded','true');if(!openedBefore){openedBefore=true;resetConversation();}byId('chatInput').focus();}
  function closeChat(){byId('chatPanel').classList.add('hidden');byId('chatFab').setAttribute('aria-expanded','false');byId('chatFab').focus();}
  byId('chatFab').addEventListener('click',()=>byId('chatPanel').classList.contains('hidden')?openChat():closeChat());
  byId('chatClose').addEventListener('click',closeChat);
  byId('chatReset').addEventListener('click',resetConversation);
  byId('chatForm').addEventListener('submit',event=>{event.preventDefault();const input=byId('chatInput');const text=input.value;input.value='';ask(text);input.focus();});
  document.querySelectorAll('[data-chat-prompt]').forEach(button=>button.addEventListener('click',()=>{ask(button.dataset.chatPrompt);byId('chatInput').focus();}));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!byId('chatPanel').classList.contains('hidden'))closeChat();});
})();
