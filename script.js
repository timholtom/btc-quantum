// Theme toggle functionality
const SUN_ICON='<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/></svg>';
const MOON_ICON='<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/></svg>';

function setThemeIcon(){
  const icon=document.querySelector('.theme-icon');
  // In dark mode show sun (switch to light), in light mode show moon (switch to dark)
  icon.innerHTML=document.body.classList.contains('light')?MOON_ICON:SUN_ICON;
}

function toggleTheme(){
  document.body.classList.toggle('light');
  localStorage.setItem('theme',document.body.classList.contains('light')?'light':'dark');
  setThemeIcon();
}

function initTheme(){
  if(localStorage.getItem('theme')!=='dark') document.body.classList.add('light');
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
const GEMINI_KEY='AIzaSyBNecNQyEMM5UDnjaCVDH2ZT93f5jmFysA';
const SYSTEM_CTX=`You are a helpful assistant embedded on a Bitcoin vs Quantum Computing research page. Answer questions about:
- Quantum computing threat to Bitcoin (Shor's algorithm, ECC vulnerability)
- BIP-360 (P2MR) proposal - Draft v0.11.0, bc1z addresses, removes key path spend
- Address vulnerability: P2PK (vulnerable), P2TR/Taproot (vulnerable), P2PKH/P2WPKH (safe if unused)
- Nic Carter quantum assessment: According to Nic Carter (Castle Island Ventures), after 6 months of research and discussions with Nobel Prize-winning physicists, he estimates a 70-80% probability of a quantum break by 2035. He scores Bitcoin Core developers' quantum preparedness at 1/100. He notes that ~2M BTC in Satoshi's original P2PK wallets are directly vulnerable, and compares the quantum computing race to the 1939 atomic bomb race between nations.
- Vulnerable BTC updated figure: Research from pq-bitcoin.org shows that as of block 900,000, approximately 6.51 million BTC (32.7% of total supply) is vulnerable to quantum attacks, worth over $700 billion. Almost 70% of this at-risk Bitcoin is due to address reuse.
- CRQC Response Playbook: PQ-Bitcoin.org has published a CRQC Response Playbook outlining how Bitcoin can rapidly achieve quantum resistance once cryptographically relevant quantum computers appear to be within striking distance. The key message: plan now while there's time.
- Podcast resources: Key podcasts covering Bitcoin quantum risk: Delphi Digital's interview with Nic Carter (Feb 2026), CoinDesk Blockspace Pod 'Quantum: The Next Battleground' (Feb 2026), and PQ-Bitcoin.org's research by Clara and Anthony presented at TabConf 2025.
- Current QC state: ~1,500 physical qubits, need 13M+ to break Bitcoin. ~12 logical qubits, need 4M+
- Google Willow (105 qubits, Dec 2024), Quantum Echoes (Oct 2025, first verifiable quantum advantage, NOT crypto-relevant)
- Microsoft Majorana 1 (Feb 2025, topological qubits, path to 1M qubits, wildcard)
- NIST PQC standards finalized Aug 2024 (ML-KEM, ML-DSA, SLH-DSA)
- CNSA 2.0 mandates: PQ by 2030 (software), 2033 (browsers), 2035 (ECC disallowed in US gov)
- Signature size problem: Schnorr 64B vs ML-DSA 2.4KB vs SPHINCS+ 7.8-50KB
- Timeline estimates: most researchers say 15-30+ years, some govs plan for 10 years
- Social sentiment: 60% concerned not panicking, 20% not worried, 15% building solutions, 5% alarmist
- SHA-256 mining is NOT threatened (Grover's gives only quadratic speedup, 128-bit still safe)
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