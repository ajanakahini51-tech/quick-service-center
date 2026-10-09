const FORMSREACH_API_KEY = 'fr_42487b8241eeb3d0368ec907c22439240f85003a8d320d2c';

document.querySelectorAll('.service-hot').forEach(el => {
  el.addEventListener('click', () => {
    const s = document.getElementById('ibAppliance');
    if (s) s.value = el.dataset.appliance;
  });
});

document.querySelectorAll('[data-pro-appliance]').forEach(el => {
  el.addEventListener('click', () => {
    setTimeout(() => {
      const s = document.getElementById('pbAppliance');
      if (s) s.value = el.dataset.proAppliance;
    }, 50);
  });
});

let formsReachPromise;

function loadFormsReach() {
  if (window.FormsReach &&
      typeof window.FormsReach.submitForm === 'function') {
    return Promise.resolve();
  }

  if (!formsReachPromise) {
    formsReachPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =
        'https://unpkg.com/@formsreach/js/dist/formsreach.min.js';

      script.onload = () => {
        if (window.FormsReach &&
            typeof window.FormsReach.submitForm === 'function') {
          resolve();
        } else {
          reject(new Error('FormsReach SDK unavailable'));
        }
      };

      script.onerror = () =>
        reject(new Error('FormsReach SDK could not load'));

      document.head.appendChild(script);
    });
  }

  return formsReachPromise;
}

function setupBookingForm(formId, prefix) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const v = id => {
      const el = document.getElementById(id);
      return el ? el.value.trim() : '';
    };

    const button = form.querySelector(
      'button[type="submit"], input[type="submit"]'
    );

    let status = form.querySelector('.booking-submit-status');

    if (!status) {
      status = document.createElement('p');
      status.className = 'booking-submit-status';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      status.style.cssText =
        'font-weight:bold;margin:10px 0;color:#087f23;';
      if (button) {
        button.insertAdjacentElement('afterend', status);
      } else {
        form.appendChild(status);
      }
    }

    if (button) button.disabled = true;
    status.textContent = 'Submitting booking...';

    try {
      if (!FORMSREACH_API_KEY ||
          FORMSREACH_API_KEY === 'PASTE_YOUR_API_KEY_HERE') {
        throw new Error('Please add the FormsReach API key');
      }

      await loadFormsReach();

      const data = {
        customer_name: v(prefix + 'Name'),
        mobile_number: v(prefix + 'Mobile'),
        address: v(prefix + 'Address'),
        preferred_date: v(prefix + 'Date') || 'Not specified',
        appliance: v(prefix + 'Appliance'),
        preferred_time: v(prefix + 'Time') || 'Not specified',
        problem_description: v(prefix + 'Problem')
      };

      await window.FormsReach.submitForm({
        apiKey: FORMSREACH_API_KEY,
        data: data
      });

      status.textContent =
        'Booking Submitted Successfully! We will contact you soon.';

      form.reset();

    } catch (error) {
      console.error('Booking submission error:', error);

      status.style.color = '#b00020';
      status.textContent =
        'Booking could not be submitted. Please try again or call us.';
    } finally {
      if (button) button.disabled = false;
    }
  });
}

setupBookingForm('inlineBookingForm', 'ib');
setupBookingForm('proBookingForm', 'pb');

/* Customer Reviews */
(function () {
  const reviews = [
    {
      name: 'Rakesh Mondal',
      photo: 'assets/review_rakesh.jpg',
      text: 'খুব ভালো সার্ভিস, সময় মত কাজ হয়েছে।'
    },
    {
      name: 'Ramesh Mondal',
      photo: 'assets/review_ramesh.jpg',
      text: 'কাজ খুব সুন্দর হয়েছে, ব্যবহারও ভালো ছিল।'
    },
    {
      name: 'Puja Saha',
      photo: 'assets/review_puja.jpg',
      text: 'সময়মতো এসে সমস্যাটা দ্রুত ঠিক করে দিয়েছেন।'
    },
    {
      name: 'Rahul Dey',
      photo: 'assets/review_rahul.jpg',
      text: 'ওয়াশিং মেশিনের সার্ভিস খুব ভালো হয়েছে।'
    },
    {
      name: 'Mita Roy',
      photo: 'assets/review_mita.jpg',
      text: 'সার্ভিস ভালো, পরিষ্কারভাবে সব বুঝিয়ে দিয়েছেন।'
    },
    {
      name: 'Amit Ghosh',
      photo: 'assets/review_amit.jpg',
      text: 'ভালো কাজ, যুক্তিসঙ্গত চার্জ এবং সময়মতো সার্ভিস।'
    }
  ];

  const photo = document.getElementById('reviewPhoto');
  const name = document.getElementById('reviewName');
  const text = document.getElementById('reviewText');

  if (!photo || !name || !text) return;

  let i = 0;

  function showReview(n) {
    i = (n + reviews.length) % reviews.length;
    const r = reviews[i];
    photo.src = r.photo;
    name.textContent = r.name;
    text.textContent = r.text;
  }

  const next = document.createElement('button');
  const prev = document.createElement('button');

  [prev, next].forEach(b => {
    b.type = 'button';
    b.style.position = 'absolute';
    b.style.top = '76.75%';
    b.style.height = '7.15%';
    b.style.width = '4.2%';
    b.style.zIndex = '21';
    b.style.border = '0';
    b.style.background = 'transparent';
    b.style.cursor = 'pointer';
    b.setAttribute('aria-label', 'Change customer review');
  });

  prev.style.left = '56.5%';
  next.style.left = '94.5%';

  const page = document.querySelector('.page');
  if (page) {
    page.append(prev, next);
    prev.addEventListener('click', () => showReview(i - 1));
    next.addEventListener('click', () => showReview(i + 1));
  }

  showReview(0);
  setInterval(() => showReview(i + 1), 5000);
})();
/* Quick Service Center: Require Desktop Site on mobile */
(function () {
  const style = document.createElement('style');
  style.textContent = `
    #qsc-desktop-gate {
      position: fixed;
      inset: 0;
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background: #f3f7fb;
      font-family: Arial, sans-serif;
      text-align: center;
      box-sizing: border-box;
    }

    #qsc-desktop-gate .qsc-box {
      max-width: 360px;
      padding: 28px 22px;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 8px 28px rgba(0,0,0,.12);
    }

    #qsc-desktop-gate h2 {
      color: #063c68;
      margin: 0 0 14px;
      font-size: 24px;
    }

    #qsc-desktop-gate p {
      color: #34495e;
      font-size: 16px;
      line-height: 1.6;
    }

    #qsc-desktop-gate .qsc-step {
      margin-top: 18px;
      padding: 14px;
      background: #e8f3ff;
      border-radius: 10px;
      color: #063c68;
      font-weight: bold;
      line-height: 1.7;
    }

    html.qsc-desktop-required body > *:not(#qsc-desktop-gate) {
      display: none !important;
    }
  `;
  document.head.appendChild(style);

  function checkDesktopSite() {
    const required = window.innerWidth <= 600;
    let gate = document.getElementById('qsc-desktop-gate');

    if (required) {
      document.documentElement.classList.add('qsc-desktop-required');

      if (!gate) {
        gate = document.createElement('div');
        gate.id = 'qsc-desktop-gate';
        gate.innerHTML = `
          <div class="qsc-box">
            <h2>Quick Service Center</h2>
            <p>আমাদের ওয়েবসাইট ব্যবহার করতে প্রথমে Chrome-এ Desktop Site চালু করুন।</p>
            <div class="qsc-step">
              ১. উপরের তিনটি ডট (⋮) চাপুন।<br>
              ২. Desktop site-এ টিক দিন।<br>
              ৩. ওয়েবসাইটটি আবার খুলুন।
            </div>
          </div>
        `;
        document.body.appendChild(gate);
      }
    } else {
      document.documentElement.classList.remove('qsc-desktop-required');
      if (gate) gate.remove();
    }
  }

  checkDesktopSite();
  window.addEventListener('resize', checkDesktopSite);
})();
