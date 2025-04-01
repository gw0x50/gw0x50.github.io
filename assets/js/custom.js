// 스크롤 이벤트 처리
document.addEventListener('DOMContentLoaded', function() {
  const masthead = document.querySelector('.masthead');
  const scrollThreshold = 50;

  window.addEventListener('scroll', function() {
    if (window.scrollY > scrollThreshold) {
      masthead.classList.add('is-scrolled');
    } else {
      masthead.classList.remove('is-scrolled');
    }
  });

  // 이미지 레이지 로딩
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // 검색 결과 하이라이트
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const query = this.value.trim().toLowerCase();
      const results = document.querySelectorAll('.search-content .archive__item-excerpt');
      
      results.forEach(result => {
        const text = result.textContent;
        if (query && text.toLowerCase().includes(query)) {
          const regex = new RegExp(query, 'gi');
          result.innerHTML = text.replace(regex, match => `<mark>${match}</mark>`);
        } else {
          result.innerHTML = text;
        }
      });
    });
  }
}); 