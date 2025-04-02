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

  // 인기 포스트 표시
  if (document.querySelector('.popular-posts')) {
    // 로컬 스토리지에서 조회수 데이터 가져오기
    const viewCounts = JSON.parse(localStorage.getItem('postViewCounts') || '{}');
    
    // 조회수 기준으로 정렬
    const sortedPosts = Object.entries(viewCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5); // 상위 5개만
    
    // HTML 생성
    const popularPostsHtml = sortedPosts.map(([url, count]) => `
      <li>
        <a href="${url}">${document.querySelector(`a[href="${url}"]`)?.textContent || url}</a>
        <span class="view-count">(${count}회)</span>
      </li>
    `).join('');
    
    // 화면에 표시
    document.querySelector('.popular-posts').innerHTML = `
      <h4>인기 포스트</h4>
      <ul>${popularPostsHtml}</ul>
    `;
  }
  
  // 현재 페이지 조회수 증가
  const currentPath = window.location.pathname;
  if (currentPath.includes('/posts/')) {
    const viewCounts = JSON.parse(localStorage.getItem('postViewCounts') || '{}');
    viewCounts[currentPath] = (viewCounts[currentPath] || 0) + 1;
    localStorage.setItem('postViewCounts', JSON.stringify(viewCounts));
  }
}); 