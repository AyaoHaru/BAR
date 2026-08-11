const userInput = document.getElementById('userInput');
const submitBtn = document.getElementById('submitBtn');
const dialogue = document.getElementById('dialogue');
const starsContainer = document.getElementById('stars');
const audioStatus = document.getElementById('audioStatus');

const tapeAudio = document.getElementById('tapeAudio');
const specialAudio = document.getElementById('specialAudio');

const collectBox = document.getElementById('collectBox');
const enteredAnswers = new Set();

function addToCollectBox(answer) {
  const item = document.createElement('span');
  item.className = 'collect-item';
  item.textContent = answer;
  collectBox.appendChild(item);
}

let unmatchedCounter = 0;

const defaultReplies = [
  '嗯……这不是正确答案，再想想。这并不是一个字谜或脑筋急转弯，只要猜测就好了。',
  '不错的尝试，再想想。这不是正确答案。如果你输入了正确答案，我会很明确地告诉你的。',
  '呵呵，看来这个问题难到你了。这不是正确答案。',
  '恭喜你——这不是正确答案。或许我选定的答案太难了？',
  '这不是正确答案。也许你需要一些提示……提示一：答案并不是动词、动名词或副词。',
  '如何，还在思考吗？还是说只想试试有多少句对话？不论如何，这不是正确答案。',
  '这不是正确答案。没关系，在你答出来之前，我们还有很多时间。',
  '追寻答案的过程，总需要一些耐心。这不是正确答案。',
  '这不是正确答案，但我带来了提示二：答案也不是形容词或名词。哎呀，我几乎把答案告诉你了。',
  '这不是正确答案，但我带来了一则有趣的秘闻：这个游戏其实有两个可行的答案。',
  '十二是一个很特别的数字。地球时代，生肖、星座、一年中的月份、一天中的时辰，都是“十二”个……它们本质上都来源于太阳、月亮与地球的相对运动：太阳光往返于地球南北回归线的时间被定为一年；而在此期间，月相会发生大约十二次盈亏。地球时代，许多地区的人类都能观测到这种现象。正因如此，在众多地球文化中，十二被看作是“完整、圆满的轮回”。噢，忘记说了，这次的结果也不是正确答案。',
  '如果你好奇我为什么突然提到“十二”——当你回答错误、而没有触发特殊对话时，我们的常规对话只有十二句——也就是只到这一句。然后，我们就将开始新的循环。当然，答案也不是数词。'
];

function getReply(input) {
  const text = input.trim();

  if (text === '') {
    return '就算不知道答案，猜一猜也没坏处。';
  }

  const ENtext = text.toLowerCase();

  const usWordsEN = ['us'];
  if (usWordsEN.includes(ENtext)) return '……看来你已经理解了一切的“本质”，我很高兴。那么，剩下的问题就是“要如何输入这个答案”了。';

  const closeWordsCN = ['我们'];
  const closeWordsEN = ['we', 'our', 'ours', 'ourselves'];
  if (closeWordsCN.includes(text) || closeWordsEN.includes(ENtext)) return '哎呀……你已经想到正确答案了。最终答案是这个词语的另一种说法，是一个简短的英文单词。';

  const youWordsCN = ['你', '你们', '点歌机'];
  const youWordsEN = ['you', 'your', 'yourself', 'yourselves', 'jukebox'];
  if (youWordsCN.includes(text) || youWordsEN.includes(ENtext)) return '我吗？这倒也没说错。不过这并不是答案。如果“我”是莫里安星渊，那么身处其中的你又是什么呢？';

  const meWordsCN = ['我', '在下', '本人', '自己'];
  const meWordsEN = ['me', 'i', 'myself', 'self'];
  if (meWordsCN.includes(text) || meWordsEN.includes(ENtext)) return '我同意这点，但离最终的答案还有偏差。在那无尽的星渊里，有许多不属于“你”的东西，不是吗？';

  const othersWordsCN = ['他人', '他者'];
  const othersWordsEN = ['he', 'she', 'his', 'her', 'hers', 'him', 'they', 'them', 'their', 'theirs', 'other', 'others', 'other people'];
  if (othersWordsCN.includes(text) || othersWordsEN.includes(ENtext)) return '莫里安星渊是“他者”的概念的确很符合王国的定义。毕竟潜入时，船所进入的是“他人的潜意识域”。不过，如果你了解“认知错乱”，就会意识到潜意识域并不仅仅属于潜入的对象。';

  const choiceWordsCN = ['战车', '星星', '月亮', '愚人', '隐者', '选择','抉择','抉择之时','选择之时'];
  const choiceWordsEN = ['hermit', 'chariot', 'chariots', 'hermits', 'star', 'stars', 'moon', 'moons', 'fool', 'fools','choice', 'choices'];
  if (choiceWordsCN.includes(text) || choiceWordsEN.includes(ENtext)) return '无论是主动还是被迫，我们有时不得不做出选择。你选择了哪一条道路呢? 道路为你指示答案了吗？';

  const subconsciousWordsCN = ['潜意识域', '黑海', '头脑', '头脑深处', '大脑'];
  const subconsciousWordsEN = ['subconscious', 'subconscious field', 'brain', 'mind', 'minds', 'brains'];
  if (subconsciousWordsCN.includes(text) || subconsciousWordsEN.includes(ENtext)) return '头脑深处的黑海，潜意识域……没错，这是王国给出的字面上的定义。不过，潜意识域又是什么呢？最终的答案是更接近本质的东西。';

  const chaosWordsCN = ['混乱', '混乱的', '黑洞'];
  const chaosWordsEN = ['chaotic', 'black hole', 'blackhole', 'chaos'];
  if (chaosWordsCN.includes(text) || chaosWordsEN.includes(ENtext)) return '没错，那是一个混沌的地方，一切记忆和情感都混杂在一起，正如我们现在所处的黑洞。即便如此，其中也有一些秩序——大体上，这句话是正确的，但这不是正确答案。';

  const orderWordsCN = ['秩序的', '可预测的', '机器', '系统','秩序','预测','模型','计算','计算结果','精密仪器','仪器'];
  const orderWordsEN = ['order', 'organized', 'predictable', 'machine', 'machines', 'machinery', 'system', 'systematic','model', 'predict', 'calculation', 'results','result'];
  if (orderWordsCN.includes(text) || orderWordsEN.includes(ENtext)) return '也许是如此——能够被机器探查、计算和干预，说明那里存在着某种秩序和系统。不过，影响它的因素太过繁杂，它的本质仍是混沌的。无论如何，这不是正确答案。';

  const aprilWordsCN = ['愚人节', '桃花源'];
  const aprilWordsEN = ['april fools', 'april fool', 'april fools\'', 'april fools\' day', 'aprilfool', 'april fools day'];
  if (aprilWordsCN.includes(text) || aprilWordsEN.includes(ENtext)) return '理想中的桃源不见得存在，但值得找寻——不过它并不能给你这个问题的答案。';

  const humanWordsCN = ['人类', '人', '所有人'];
  const humanWordsEN = ['human', 'human being'];
  if (humanWordsCN.includes(text) || humanWordsEN.includes(ENtext)) return '人类中心主义者常把莫里安星渊当作人类潜意识活动的映射，但也许人类只是暂时无法观测到动物、植物与无机物的潜意识活动。作为一个能够思考的点唱机，我不得不告诉你：这不是正确答案。';

  const twelveWordsCN = ['十二'];
  const twelveWordsEN = ['twelve'];
  if (twelveWordsCN.includes(text) || twelveWordsEN.includes(ENtext)) return '看来我突发的感想给你造成误解了——十分抱歉，不过那并不是一句提示。';

  const changeWordsCN = ['变化', '运动', '变化的', '变化中的', '不断变化的'];
  const changeWordsEN = ['changing', 'evolving', 'change', 'evolve'];
  if (changeWordsCN.includes(text) || changeWordsEN.includes(ENtext)) return '自然。一切物质都是运动的，一切事物都处于变化之中……有些事物看似是静止的，但那也是因为他们与我们一同运动而已。绝对的静止不存在。不过这不是答案。';

  const cosmosWordsCN = ['宇宙', '太空'];
  const cosmosWordsEN = ['universe', 'space', 'cosmos', 'nature'];
  if (cosmosWordsCN.includes(text) || cosmosWordsEN.includes(ENtext)) return '有着点点闪光的黑色海域——看着和宇宙很像，不是吗？事实上，它们也的确是一样的。这个答案很精巧，但很可惜，不是正确答案。';

  const everythingWordsCN = ['一切', '所有', '一切事物', '全部', '全世界', '世界'];
  const everythingWordsEN = ['everyone', 'everything', 'world'];
  if (everythingWordsCN.includes(text) || everythingWordsEN.includes(ENtext)) return '我不讨厌这个答案——某种意义上来说，它是个十分准确的表达。但我更喜欢另一个更有参与感的说法，所以没有选择它作为正确答案。';

  const particleWordsCN = ['粒子', '潜意识粒子', '量子', '量子力学', '小体', '微粒'];
  const particleWordsEN = ['particle', 'quantum', 'quantum mechanics', 'corpuscularization', 'corpuscularianism', 'corpuscular', 'corpuscle'];
  if (particleWordsCN.includes(text) || particleWordsEN.includes(ENtext)) return '一切事物都是粒子，不是吗？当然，我指的并不是具象的“粒子”，它更像是介于一维、二维和三维之间的一个点。尽管这不是最终答案，但我很高兴你也这么想。';

  const whatWordsCN = ['吗', '什么', '哪里', '何处', '何方', '为什么', '何物', '何', '终极问题'];
  const whatWordsEN = ['what', 'why', 'how', 'when', 'where','the ultimate question', 'question', 'ultimate question'];
  if (whatWordsCN.includes(text) || whatWordsEN.includes(ENtext)) return '永远保持好奇、永远保持思考，这便是哲学家的美德。我很高兴自己是一台懂得思考的点唱机。';

  const morianWordsCN = ['莫里安', '莫里安星渊'];
  const morianWordsEN = ['morian', 'morian abyss', 'abyss'];
  if (morianWordsCN.includes(text) || morianWordsEN.includes(ENtext)) return '有时候事情没那么复杂，你一定是这么想的——但这并不是问题的答案。莫里安星渊只是人们给它的名字，但它究竟是什么？';

  const nothingWordsCN = ['无','虚无','空虚','什么也不是','空']
  if (nothingWordsCN.includes(text)) return '如果是这个说法所对应的英文单词，倒是有尝试的价值。';
  const nothingWordsEN = ['nothing'];
  if (nothingWordsEN.includes(ENtext)) return '呵呵……如果你觉得这是正确答案的话，不妨试试看？不过，你“要如何输入这个答案”呢？';

  const factionWordsCN = ['船锚礁', '船', '锚', '礁', '飞马座','王国军','王国','卢西米亚王国','潜情局','潜意识情报局'];
  const factionWordsEN = ['boat', 'anchor', 'reef', 'pegasus', 'lucemia kingdom', 'kingdom', 'sia', 'subconcious intelligence agency'];
  if (factionWordsCN.includes(text) || factionWordsEN.includes(ENtext)) return '所有人这会儿都在这里了……你们能够找到终极问题的解答吗？';

  const metaWordsCN = ['企划'];
  const metaWordsEN = ['project'];
  if (metaWordsCN.includes(text) || metaWordsEN.includes(ENtext)) return '感谢游玩玩玩王元……（点唱机被神秘的力量打断了，看起来这并非正确答案——点唱机用气声轻轻地说）';

  unmatchedCounter++;
  const index = (unmatchedCounter - 1) % defaultReplies.length;
  return defaultReplies[index];
}

function stopAllAudio(keepSpecial = false) {
  tapeAudio.pause();
  tapeAudio.currentTime = 0;

  if (!keepSpecial) {
    specialAudio.pause();
    specialAudio.currentTime = 0;
  }
}
function playAudioForInput(text) {
  const t = text.trim();
  const ENt = t.toLowerCase();
  // 每次提交先停掉磁带音效
  tapeAudio.pause();
  tapeAudio.currentTime = 0;

  // 如果这次不是答案，就把上一次的 us.mp3 也停掉
  if (t !== 'us' & t !== 'nothing') {
    specialAudio.pause();
    specialAudio.currentTime = 0;
  }

  // 答案特殊逻辑：先播 1 秒 tapeAudio，再播 specialAudio
  if (t === 'us' || t === 'nothing') {
    audioStatus.textContent = '音频正在播放中……';

    tapeAudio.play().catch(() => {});

    setTimeout(() => {
      tapeAudio.pause();
      tapeAudio.currentTime = 0;
      specialAudio.play().catch(() => {});
    }, 2000);

    return specialAudio;
  }

  // 其它情况：正常播放 tapeAudio
  audioStatus.textContent = '音频正在播放中……';
  tapeAudio.play().catch(() => {});
  return tapeAudio;
}

async function typewriter(text, speed = 45) {
  submitBtn.disabled = true;
  dialogue.innerHTML = '';

  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  cursor.textContent = '▍';

  let content = '';
  for (let i = 0; i < text.length; i++) {
    content += text[i];
    dialogue.innerHTML = '';
    dialogue.appendChild(document.createTextNode(content));
    dialogue.appendChild(cursor);
    await new Promise(resolve => setTimeout(resolve, speed));
  }

  cursor.remove();
  submitBtn.disabled = false;
}
async function handleSubmit() {
  const input = userInput.value;
  const trimmed = input.trim();
  const answerKey = /^[a-zA-Z]+$/.test(trimmed) ? trimmed.toLowerCase() : trimmed;

  if (enteredAnswers.has(answerKey) & answerKey !== 'us' & answerKey !== 'nothing') {
    await typewriter('你已经输入过这个答案了，点唱机不接受重复点歌。');
    userInput.focus();
    return;
  }

  enteredAnswers.add(answerKey);

  if (trimmed !== '') {
    addToCollectBox(trimmed);
  }

  const reply = getReply(input);

  // 播放对应音频
  const currentAudio = playAudioForInput(input);

  // 打字机回复
  await typewriter(reply);

  // 文本结束后，只停止 tape.mp3
  // 如果当前播放的是 us.mp3，则保留到下次提交才停
  if (currentAudio === tapeAudio) {
    setTimeout(() => {
      stopAllAudio(false);
      audioStatus.textContent = '暂时无音频播放';
    }, 1000); // 延迟 1 秒后停止
  } else {
    // us.mp3 继续播放，不停止
    audioStatus.textContent = '音频正在播放中……';
  }

  userInput.focus();
}

submitBtn.addEventListener('click', handleSubmit);

userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSubmit();
});

function createStars(count = 140) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const star = document.createElement('span');
    star.className = 'star';

    const size = Math.random() * 2.2 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dur = (Math.random() * 3 + 1.2).toFixed(2) + 's';
    const delay = (Math.random() * 3).toFixed(2) + 's';
    const op = (Math.random() * 0.6 + 0.25).toFixed(2);

    star.style.left = x + 'vw';
    star.style.top = y + 'vh';
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.setProperty('--dur', dur);
    star.style.setProperty('--op', op);
    star.style.animationDelay = delay;

    if (Math.random() > 0.85) {
      star.style.animationName = 'twinkle, drift';
      star.style.animationDuration = dur + ', ' + (Math.random() * 8 + 8).toFixed(2) + 's';
      star.style.animationIterationCount = 'infinite, infinite';
      star.style.animationDirection = 'alternate, alternate';
    }

    fragment.appendChild(star);
  }

  starsContainer.appendChild(fragment);
}

createStars(140);
