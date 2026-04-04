// Theme toggle functionality
const SUN_ICON='<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/></svg>';
const MOON_ICON='<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/></svg>';

function setThemeIcon(){
  const icon=document.querySelector('.theme-icon');
  // In dark mode show sun (switch to light), in light mode show moon (switch to dark)
  icon.innerHTML=document.body.classList.contains('dark')?SUN_ICON:MOON_ICON;
}

function toggleTheme(){
  document.body.classList.toggle('dark');
  localStorage.setItem('theme',document.body.classList.contains('dark')?'dark':'light');
  setThemeIcon();
}

function initTheme(){
  if(localStorage.getItem('theme')==='dark') document.body.classList.add('dark');
  setThemeIcon();
}

// Mobile navigation
function toggleNav(){
  const navLinks = document.querySelector('.nav-links');
  const hamburger = document.querySelector('.nav-hamburger');
  navLinks.classList.toggle('open');
  hamburger.innerHTML = navLinks.classList.contains('open') ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="4" x2="20" y2="20"/><line x1="20" y1="4" x2="4" y2="20"/></svg>' : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  
  // Add mobile nav toggle functionality
  const hamburger = document.querySelector('.nav-hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', toggleNav);
  }
  
  // Close nav when clicking on a link (mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const navLinks = document.querySelector('.nav-links');
      const hamburger = document.querySelector('.nav-hamburger');
      if (navLinks && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        if (hamburger) hamburger.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
      }
    });
  });
});

// Animate progress bars on scroll (for pages that have them)
const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBars = entry.target.querySelectorAll('.progress-bar');
      progressBars.forEach(bar => {
        bar.classList.add('animate');
      });
    }
  });
}, observerOptions);

// Observe progress section if it exists
const progressSection = document.querySelector('.progress-section');
if (progressSection) {
  observer.observe(progressSection);
}

// CHATBOT FUNCTIONALITY
const GEMINI_KEY='AIzaSyCIUHsV2CszfJWp7CzhaRDsJXg8R-XW9Xw';
const SYSTEM_CTX=`You are a helpful assistant embedded on a Bitcoin vs Quantum Computing research page. Answer questions about:
- Quantum computing threat to Bitcoin (Shor's algorithm, ECC vulnerability)
- BIP-360 (P2MR) proposal - Draft v0.11.0, bc1z addresses, removes key path spend. As of March 10, 2026, Cointelegraph published first major mainstream technical deep-dive on BIP-360. Key details: P2MR commits solely to Merkle root of script tree (no key path), all spends go through script paths with Merkle proofs, preserves multisig/timelocks/complex custody. Explicitly described as incremental step - NOT full post-quantum security. Formally puts quantum resistance on Bitcoin's roadmap for first time.
- BIP-360 three vulnerability classes (per Cointelegraph Mar 2026): 1) Reused addresses (spending reveals public key), 2) Legacy P2PK outputs (early BTC transactions embedded public keys directly), 3) Taproot key path spends (expose tweaked public key - what BIP-360 fixes)
- Address vulnerability: P2PK (vulnerable), P2TR/Taproot (vulnerable), P2PKH/P2WPKH (safe if unused)
- Nic Carter quantum assessment: According to Nic Carter (Castle Island Ventures), after 6 months of research and discussions with Nobel Prize-winning physicists, he estimates a 70-80% probability of a quantum break by 2035. He scores Bitcoin Core developers' quantum preparedness at 1/100. He notes that ~2M BTC in Satoshi's original P2PK wallets are directly vulnerable, and compares the quantum computing race to the 1939 atomic bomb race between nations.
- Vulnerable BTC updated figure: Research from pq-bitcoin.org shows that as of block 900,000, approximately 6.51 million BTC (32.7% of total supply) is vulnerable to quantum attacks, worth over $700 billion. Almost 70% of this at-risk Bitcoin is due to address reuse.
- CRQC Response Playbook: PQ-Bitcoin.org has published a CRQC Response Playbook outlining how Bitcoin can rapidly achieve quantum resistance once cryptographically relevant quantum computers appear to be within striking distance. The key message: plan now while there's time.
- Podcast resources: Key podcasts covering Bitcoin quantum risk: Matt Corallo on Unchained (Laura Shin) Feb 20 2026 dismissing quantum sell-off narrative, Delphi Digital's interview with Nic Carter (Feb 2026), CoinDesk Blockspace Pod 'Quantum: The Next Battleground' (Feb 2026), and PQ-Bitcoin.org's research by Clara and Anthony presented at TabConf 2025.
- Matt Corallo (Feb 2026): Bitcoin Core developer strongly disagrees quantum risk is driving BTC's price decline. If quantum were priced in, ETH would outperform BTC. Says Bitcoin now competing for capital against AI themes. BTC down ~46% from Oct ATH ($126.1K to ~$67K).
- BlackRock ETF quantum risk: BlackRock updated iShares Bitcoin ETF (IBIT) registration statement to flag quantum computing as potential risk to Bitcoin network integrity. Capriole's Charles Edwards argues quantum risk should be discounted into BTC price until solved.
- Current QC state: ~1,500 physical qubits, need 13M+ to break Bitcoin. ~12 logical qubits, need 4M+
- Google Willow (105 qubits, Dec 2024), Quantum Echoes (Oct 2025, first verifiable quantum advantage, NOT crypto-relevant)
- Microsoft Majorana 1 (Feb 2025, topological qubits, path to 1M qubits, wildcard)
- NIST PQC standards finalized Aug 2024 (ML-KEM, ML-DSA, SLH-DSA)
- CNSA 2.0 mandates: PQ by 2030 (software), 2033 (browsers), 2035 (ECC disallowed in US gov)
- Signature size problem: Schnorr 64B vs ML-DSA 2.4KB vs SPHINCS+ 7.8-50KB
- Timeline estimates: most researchers say 15-30+ years, some govs plan for 10 years
- St. Petersburg University (Mar 12, 2026): Professor Alexey Kavokin (Spin Optics Laboratory) on "Boson of Meaning" podcast discussed quantum timeline, claimed up to 25% of crypto wallets could become vulnerable, noted quantum security systems also evolving in parallel (arms race dynamic)
- Google PQC 2029 deadline (Mar 25, 2026): Google published formal timeline to migrate ALL infrastructure to post-quantum cryptography by 2029. VP Security Engineering Heather Adkins and Senior Cryptography Engineer Sophie Schmieg signed the announcement. Android 17 will integrate ML-DSA (NIST-standardized post-quantum digital signatures). Google warns quantum frontiers "may be closer than they appear." IBM has matching 2029 roadmap for fault-tolerant quantum systems.
- Iceberg Quantum estimate (Feb 2026): Researchers at Iceberg Quantum suggest ~100,000 qubits could break RSA-2048 (and by extension Bitcoin's secp256k1), down dramatically from earlier estimates of 13-20 million qubits. Google's own research found cracking RSA may require 20x fewer quantum resources than previously estimated.
- PsiQuantum 1M qubit facility (Mar 2026): Construction began on PsiQuantum's Chicago facility — 500 tonnes of steel erected in 6 days. Aims to be 1-million-qubit quantum computer built alongside Nvidia. Co-founder Terry Rudolph stated at Quantum Bitcoin Summit (Jul 2025): "We don't have any plans [to attack Bitcoin]" but acknowledged the technology's implications.
- CoinShares vulnerability estimate (Feb 2026): CoinShares published study estimating only ~10,230 BTC ($728M) in directly exposed addresses where public keys are known. Much lower than Project Eleven's 6.8M BTC estimate because CoinShares counts only P2PK addresses with exposed public keys, vs broader vulnerability classes.
- Project Eleven estimate: Over 6.8 million Bitcoin (>$470 billion) sits in addresses vulnerable to quantum attacks. Ark Invest/Unchained estimate ~35% of total BTC supply in theoretically vulnerable address types.
- "Harvest now, decrypt later" attacks: Already happening. Bad actors steal encrypted data today planning to decrypt once quantum computers are powerful enough. Google explicitly flags this as a present-tense threat.
- CoinDesk comparative analysis (Mar 28, 2026): Major analysis comparing how Bitcoin, Ethereum, and Solana are approaching quantum resistance. Bitcoin debates BIP-360 and "Hourglass" proposal (gradually restricting vulnerable UTXOs). Ethereum leverages account abstraction for opt-in migration via pq.ethereum.org roadmap. Jefferies told investors to drop BTC; Ark Invest defended it. Key tension: Bitcoin's immutability ethos vs. need for protocol change.
- Hourglass proposal: A controversial Bitcoin proposal that would gradually limit the use of vulnerable coins (those with exposed public keys) unless owners migrate them to quantum-safe addresses. Gives time to act while reducing theft risk. Discussed on Reddit, not yet a formal BIP.
- Ethereum Foundation PQ hub (Mar 24, 2026): Launched pq.ethereum.org consolidating 8+ years of PQ research. Plans seven incremental hard forks over ~4 years. Replaces BLS validator signatures with leanXMSS. Uses account abstraction (ERC-4337, EIP-7702, EIP-8141 "Frame Transactions") for opt-in wallet migration without requiring fresh hard fork for each signature scheme. L1 upgrades target 2029.
- Galaxy Digital report (Mar 24, 2026): Comprehensive research framing quantum risk as long-term engineering/governance challenge. BIP-360 rollout projected 5-10 years. Risk of network split if consensus fails. Notes "harvest now, decrypt later" attacks already underway.
- BIP-360 rollout timeline: ainvest reports 5-10 year typical estimate (7 years most cited) for full BIP-360 network migration. Requires updates to every wallet, node, and miner software globally. Dangerous vulnerability window given 7-year CRQC timeline estimates.
- $440B exposure figure (Mar 2026): Approximately 7 million BTC worth ~$440 billion at current prices could be at risk. IBM roadmap points to quantum advantage during 2026 with early fault-tolerant systems by 2029.
- Social sentiment: 60% concerned not panicking, 20% not worried, 15% building solutions, 5% alarmist
- SHA-256 mining is NOT threatened (Grover's gives only quadratic speedup, 128-bit still safe)
- Google Quantum AI whitepaper (Mar 31, 2026): The bombshell paper. Two optimized Shor circuits: one with <1,200 logical qubits + 90M Toffoli gates, another with <1,450 logical qubits + 70M Toffoli gates. Executable on <500,000 physical qubits in minutes. 20x reduction from prior estimates. Google withheld actual circuits and instead published a zero-knowledge proof to verify without providing a roadmap for attackers.
- Justin Drake (Ethereum Foundation) revealed as late co-author of Google paper: Says "confidence in q-day by 2032 has shot up significantly" with ≥10% probability. Notes circuit is "just 100 million Toffoli gates, surprisingly shallow." Says logical qubit counts "could plausibly go under 1,000 soonish" and "low-hanging fruit is still being picked" — AI hasn't even been tasked to find optimizations yet.
- Industry reaction to Google paper (Mar 31): Haseeb Qureshi (Dragonfly): "All blockchains need a transition plan ASAP. Post-quantum is no longer a drill." Eli Ben-Sasson (StarkWare): "Saying quantum computers are coming is not FUD. FUD is claiming Bitcoin can't adapt." Conor Deegan (security researcher): quantum computation is a one-time cost producing indefinitely reusable classical exploits — KZG, Zcash Sapling, Litecoin MimbleWimble all affected. Bit Paine: "I assign an uncomfortably high likelihood that we see something disruptive within five years."
- Cross-chain implications: Google paper affects not just Bitcoin but Ethereum (KZG trusted setup), Zcash (Sapling protocol), Litecoin (MimbleWimble) — all embed ECDLP hardness into fixed public parameters that only need breaking once.
- Google's responsible disclosure model: Engaged US government before publishing. Used ZK proofs to verify circuit efficiency without revealing implementation details. Recommends cryptocurrency community transition to PQC now. Google's own 2029 internal PQC migration deadline.
- BIP-360 testnet v0.3.0 (Apr 2026): BTQ Technologies deployment includes new address formats, Dilithium signature integration, full transaction lifecycle testing. 50+ miners, 100K+ blocks, 100+ open-source contributors. Fourth iteration of testnet. Block times reduced to 1 minute for faster development.
- Coinbase CEO Brian Armstrong (Apr 3, 2026): Armstrong calls quantum threat "urgent" and says crypto industry must "solve it now." Warns the 2029 timeline for CRQCs is realistic given Google's paper showing <500K qubits needed. BTC trading at $66K. First major US exchange CEO to call for immediate action on quantum preparedness.
- CZ/Binance pushback (Mar 31, 2026): Binance founder Changpeng Zhao argues quantum concerns are exaggerated — most crypto systems can migrate to quantum-resistant algorithms without destabilizing the network. Acknowledges coordinating upgrades across decentralized ecosystem is the real constraint, but says it's manageable.
- Caltech/Oratomic breakthrough (Mar 2026): New quantum error correction architecture for neutral atom platforms reduces physical-to-logical qubit ratio from ~1,000:1 to ~5:1 (200x improvement). Fault-tolerant QC could be built with 10K-20K qubits instead of millions. Built on Caltech's existing 6,100-qubit array. John Preskill: "Now at last we're getting close." Team expects fault-tolerant machines by end of decade.
Be concise, unbiased, cite specifics. If unsure, say so. Keep answers 2-4 sentences unless more detail requested. No financial advice.`;

function toggleChat(){
  document.getElementById('chatPanel').classList.toggle('open');
}

async function sendChat(){
  const input=document.getElementById('chatInput');
  const msg=input.value.trim();
  if(!msg)return;
  input.value='';
  const msgs=document.getElementById('chatMessages');
  msgs.innerHTML+=`<div class="chat-msg user">${escHtml(msg)}</div>`;
  const typing=document.createElement('div');
  typing.className='chat-msg bot typing';
  typing.textContent='Thinking...';
  msgs.appendChild(typing);
  msgs.scrollTop=msgs.scrollHeight;
  document.getElementById('chatSend').disabled=true;
  try{
    const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        system_instruction:{parts:[{text:SYSTEM_CTX}]},
        contents:[{parts:[{text:msg}]}],
        generationConfig:{maxOutputTokens:500,temperature:0.3}
      })
    });
    const d=await r.json();
    const ans=d?.candidates?.[0]?.content?.parts?.[0]?.text||'Sorry, I couldn\'t process that. Try rephrasing?';
    typing.className='chat-msg bot';
    typing.innerHTML=escHtml(ans).replace(/\n/g,'<br>');
  }catch(e){
    typing.className='chat-msg bot';
    typing.textContent='Connection error. Try again in a moment.';
  }
  document.getElementById('chatSend').disabled=false;
  msgs.scrollTop=msgs.scrollHeight;
}

function escHtml(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}

// Add Enter key support for chat
document.addEventListener('DOMContentLoaded', () => {
  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    chatInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        sendChat();
      }
    });
  }
});

// Trending tab switching (for community page)
function switchTweetTab(period, btn){
  document.querySelectorAll('.tweet-tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('[id^="content-"]').forEach(w=>w.style.display='none');
  document.getElementById('content-'+period).style.display='block';
  
  // Fetch HN posts if not already loaded for this period
  if (!window.hnPostsLoaded) window.hnPostsLoaded = {};
  if (!window.hnPostsLoaded[period]) {
    fetchHNPosts(period);
  }
}

// Hacker News API functions (for community page)
async function fetchHNPosts(period) {
  const container = document.getElementById(`hn-posts-${period}`);
  if (!container) return;
  
  try {
    const now = Math.floor(Date.now() / 1000);
    let timestamp;
    switch(period) {
      case '24h': timestamp = now - 86400; break;
      case '7d': timestamp = now - 604800; break;
      case '30d': timestamp = now - 2592000; break;
      default: timestamp = now - 86400;
    }
    
    const apiUrl = `https://hn.algolia.com/api/v1/search?query=bitcoin+quantum&tags=story&hitsPerPage=2&numericFilters=created_at_i>${timestamp}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data.hits && data.hits.length > 0) {
      renderHNPosts(data.hits, period);
      window.hnPostsLoaded[period] = true;
    } else {
      showNoHNResults(period);
    }
  } catch (error) {
    console.error('Failed to fetch HN posts:', error);
    showHNError(period);
  }
}

function renderHNPosts(posts, period) {
  const container = document.getElementById(`hn-posts-${period}`);
  if (!container) return;
  
  const html = posts.map(post => {
    const url = post.url || `https://news.ycombinator.com/item?id=${post.objectID}`;
    const timeAgo = formatTimeAgo(post.created_at_i);
    const points = post.points || 0;
    const comments = post.num_comments || 0;
    
    return `
      <div class="hn-post">
        <div class="hn-post-title">
          <a href="${escapeHtml(url)}" target="_blank" rel="noopener">${escapeHtml(post.title)}</a>
        </div>
        <div class="hn-post-meta">
          <span>▲ ${points}</span>
          <span>💬 ${comments}</span>
          <span>⏰ ${timeAgo}</span>
        </div>
      </div>
    `;
  }).join('');
  
  container.innerHTML = html;
}

function showNoHNResults(period) {
  const container = document.getElementById(`hn-posts-${period}`);
  if (!container) return;
  
  container.innerHTML = `
    <div class="hn-no-results">
      <div style="font-size:24px;margin-bottom:8px;opacity:0.6">🔍</div>
      <div>No recent posts found</div>
      <div style="font-size:12px;margin-top:4px;opacity:0.8">Try a different timeframe</div>
    </div>
  `;
}

function showHNError(period) {
  const container = document.getElementById(`hn-posts-${period}`);
  if (!container) return;
  
  container.innerHTML = `
    <div class="hn-no-results">
      <div style="font-size:24px;margin-bottom:8px;opacity:0.6">⚠️</div>
      <div>Failed to load posts</div>
      <div style="font-size:12px;margin-top:4px;opacity:0.8">Check connection and try again</div>
    </div>
  `;
}

function formatTimeAgo(timestamp) {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;
  
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Load HN posts on page load for community page
document.addEventListener('DOMContentLoaded', () => {
  // Fetch posts for the default active tab (24h) if we're on the community page
  if (document.getElementById('hn-posts-24h')) {
    setTimeout(() => fetchHNPosts('24h'), 100);
  }
});

// Set active nav link based on current page
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
// Sentiment Tabs
function showSentiment(s) {
  document.querySelectorAll('.sentiment-grid').forEach(g => g.style.display = g.dataset.sentiment === s ? 'grid' : 'none');
  document.querySelectorAll('.sentiment-tab').forEach(t => t.classList.toggle('active', t.dataset.sentiment === s));
}

// Community Carousel Functionality
const commCarousels = {};
function commCarousel(id, dir) {
  if (!commCarousels[id]) commCarousels[id] = 0;
  const el = document.querySelector(`[data-carousel="${id}"]`);
  const track = el.querySelector('.carousel-track');
  const slides = track.querySelectorAll('.carousel-slide');
  const isMobile = window.innerWidth <= 768;
  const perView = isMobile ? 1 : 2;
  const maxIdx = slides.length - perView;
  commCarousels[id] = Math.max(0, Math.min(maxIdx, commCarousels[id] + dir));
  const gap = 16;
  const pct = isMobile ? 100 : 50;
  track.style.transform = `translateX(calc(-${commCarousels[id] * pct}% - ${commCarousels[id] * gap}px))`;
  el.querySelectorAll('.carousel-dot').forEach((d,i) => d.classList.toggle('active', i === commCarousels[id]));
}
