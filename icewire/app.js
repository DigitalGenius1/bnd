(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const boot = $('.boot');
  window.addEventListener('load', () => window.setTimeout(() => boot?.classList.add('done'), 650));
  window.setTimeout(() => boot?.classList.add('done'), 2200);

  const progress = $('.progress i');
  const topbar = $('.topbar');
  const coverImage = $('.cover-image');
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    topbar?.classList.toggle('scrolled', window.scrollY > 70);
    if (coverImage && window.innerWidth > 800 && window.scrollY < window.innerHeight) {
      coverImage.style.translate = `0 ${window.scrollY * .08}px`;
    }
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const menuButton = $('.contents-toggle');
  const contents = $('.contents');
  const setMenu = (open) => {
    contents?.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    menuButton?.setAttribute('aria-expanded', String(open));
  };
  menuButton?.addEventListener('click', () => setMenu(!contents?.classList.contains('open')));
  $$('.contents a').forEach(link => link.addEventListener('click', () => setMenu(false)));

  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: '0px 0px -7% 0px' });
    reveals.forEach(el => revealObserver.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  const dialog = $('#film-modal');
  const modalVideo = $('video', dialog);
  const openFilm = () => {
    if (!dialog) return;
    dialog.showModal();
    document.body.classList.add('modal-open');
    window.setTimeout(() => modalVideo?.play().catch(() => {}), 120);
  };
  const closeFilm = () => {
    modalVideo?.pause();
    dialog?.close();
    document.body.classList.remove('modal-open');
  };
  $$('[data-film]').forEach(button => button.addEventListener('click', openFilm));
  $('.modal-close')?.addEventListener('click', closeFilm);
  dialog?.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) closeFilm();
  });
  dialog?.addEventListener('close', () => {
    modalVideo?.pause();
    document.body.classList.remove('modal-open');
  });

  const journey = [
    {
      label: 'SENSE',
      title: 'Give the loop a pulse.',
      body: 'Use the sensors already present. Add only what is missing. Every reliable signal becomes a nerve ending.',
      result: 'RESULT — LIVE PHYSICAL STATE',
      image: 'https://icewire-living-infrastructure.fueledstone.chatgpt.site/assets/sensor-install.jpg',
      alt: 'Sensors connecting liquid cooling equipment to Icewire'
    },
    {
      label: 'CONNECT',
      title: 'Make unlike machines speak one language.',
      body: 'Normalize data from CDUs, pumps, manifolds, racks, meters and facility systems without replacing their local controls.',
      result: 'RESULT — ONE DATA FABRIC',
      image: 'https://icewire-living-infrastructure.fueledstone.chatgpt.site/assets/whole-system.jpg',
      alt: 'Icewire connecting the full liquid cooling system'
    },
    {
      label: 'SEE',
      title: 'Turn the facility into one living map.',
      body: 'Every asset knows what it feeds, what feeds it and which workloads depend on it. A signal finally has physical context.',
      result: 'RESULT — VERIFIED TOPOLOGY',
      image: 'https://icewire-living-infrastructure.fueledstone.chatgpt.site/assets/living-map.jpg',
      alt: 'A living topology map of liquid infrastructure'
    },
    {
      label: 'REMEMBER',
      title: 'Give operations a memory that survives the shift.',
      body: 'Telemetry, maintenance, changes, incidents and operator notes become one time-based record of how the loop behaves.',
      result: 'RESULT — OPERATIONAL MEMORY',
      image: 'https://icewire-living-infrastructure.fueledstone.chatgpt.site/assets/product-overview.jpg',
      alt: 'Icewire unifying live data and operational memory'
    },
    {
      label: 'ASK',
      title: 'Let anyone question the system in plain language.',
      body: 'Ask what changed, why it matters and which assets are involved. Answers return with evidence—not just confidence.',
      result: 'RESULT — SHARED UNDERSTANDING',
      image: 'https://icewire-living-infrastructure.fueledstone.chatgpt.site/assets/plain-language.jpg',
      alt: 'Operator asking Icewire a question in normal language'
    },
    {
      label: 'TEST',
      title: 'Explore the response before touching the machine.',
      body: 'Use rules, models and known procedures to compare options, dependencies and possible consequences.',
      result: 'RESULT — SAFER DECISIONS',
      image: 'https://icewire-living-infrastructure.fueledstone.chatgpt.site/assets/verify.jpg',
      alt: 'Icewire testing and verifying a cooling response'
    },
    {
      label: 'GUIDE',
      title: 'Move the right human through the right action.',
      body: 'Deliver the evidence, procedure and verification steps at the point of work. The operator remains in authority.',
      result: 'RESULT — CLEAR HUMAN ACTION',
      image: 'https://icewire-living-infrastructure.fueledstone.chatgpt.site/assets/guided-action.jpg',
      alt: 'Icewire guiding a technician through a field action'
    },
    {
      label: 'LEARN',
      title: 'Return every outcome to the memory.',
      body: 'The response, result and new baseline become part of the record—improving the next diagnosis across the fleet.',
      result: 'RESULT — COMPOUNDING KNOWLEDGE',
      image: 'https://icewire-living-infrastructure.fueledstone.chatgpt.site/assets/fleet.jpg',
      alt: 'Icewire learning across multiple data centre sites'
    }
  ];

  const journeyImage = $('#journey-image');
  const journeyLabel = $('#journey-label');
  const journeyTitle = $('#journey-title');
  const journeyBody = $('#journey-body');
  const journeyResult = $('#journey-result');
  const journeyIndex = $('#journey-index');
  const journeyButtons = $$('.journey-buttons button');
  journeyButtons.forEach(button => button.addEventListener('click', () => {
    const step = Number(button.dataset.step);
    const item = journey[step];
    if (!item) return;
    journeyButtons.forEach(candidate => candidate.classList.toggle('active', candidate === button));
    journeyImage?.classList.add('changing');
    window.setTimeout(() => {
      if (journeyImage) {
        journeyImage.src = item.image;
        journeyImage.alt = item.alt;
      }
      if (journeyLabel) journeyLabel.textContent = item.label;
      if (journeyTitle) journeyTitle.textContent = item.title;
      if (journeyBody) journeyBody.textContent = item.body;
      if (journeyResult) journeyResult.textContent = item.result;
      if (journeyIndex) journeyIndex.textContent = `${String(step + 1).padStart(2, '0')} / 08`;
      journeyImage?.classList.remove('changing');
    }, 220);
  }));

  const answers = {
    risk: '<span>ICEWIRE / CHANGE</span> Secondary-loop pressure fell 8% after pump P-04 began drawing more current. Three racks downstream are losing thermal margin.',
    cause: '<span>ICEWIRE / LIKELY CAUSE</span> Rack 17 is warming because flow through manifold M-2 is falling while inlet temperature remains stable. Filter restriction is the leading cause. Confidence: 82%.',
    action: '<span>ICEWIRE / GUIDED RESPONSE</span> Verify the differential-pressure sensor, compare the standby path, then prepare the approved filter-isolation procedure. No physical action has been taken.'
  };
  $$('.question-chips button').forEach(button => button.addEventListener('click', () => {
    $$('.question-chips button').forEach(candidate => candidate.classList.toggle('active', candidate === button));
    const answer = $('#ice-answer');
    if (answer) answer.innerHTML = answers[button.dataset.question] || '';
  }));

  const format = number => Math.round(number).toLocaleString('en-US');
  const calcInputs = ['events', 'minutes', 'minute-value', 'hours', 'hour-value'];
  const updateCalculator = () => {
    const values = Object.fromEntries(calcInputs.map(id => [id, Number($(`#${id}`)?.value || 0)]));
    calcInputs.forEach(id => {
      const output = $(`#${id}-out`);
      if (output) output.textContent = format(values[id]);
    });
    const downtime = values.events * values.minutes * values['minute-value'];
    const labour = values.hours * values['hour-value'];
    const total = downtime + labour;
    if ($('#downtime-value')) $('#downtime-value').textContent = `$${format(downtime)}`;
    if ($('#labour-value')) $('#labour-value').textContent = `$${format(labour)}`;
    if ($('#calc-total')) $('#calc-total').textContent = `$${format(total)}`;
  };
  calcInputs.forEach(id => $(`#${id}`)?.addEventListener('input', updateCalculator));
  updateCalculator();

  const shareUrl = 'https://is.gd/IcewireLive';
  const shareIntro = 'Meet Icewire — the nervous system for liquid infrastructure.\n\nAn interactive vision for turning data-centre cooling into one living, explainable system. Explore the product, market, economics and full vision film:';
  const whatsapp = $('[data-share="whatsapp"]');
  const email = $('[data-share="email"]');
  if (whatsapp) whatsapp.href = `https://wa.me/?text=${encodeURIComponent(`${shareIntro}\n\n${shareUrl}`)}`;
  if (email) {
    const subject = 'Icewire — The Nervous System for Liquid Infrastructure';
    const body = `${shareIntro}\n\n${shareUrl}`;
    email.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
})();
