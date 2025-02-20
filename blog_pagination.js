function changeContent(pageNumber) {
  // document.getElementById('pagination_content').innerHTML = 'This is page ' + pageNumber;

  var pageLinks = document.querySelectorAll('.pagination a');
  for (var i = 0; i < pageLinks.length; i++) {
      pageLinks[i].classList.remove('active');
  }

  document.getElementById('page' + pageNumber).classList.add('active');

  showPage(pageNumber);
}

function showPage(pageNumber) {
  // Only two pages are available now.
  const titles = ['blog_title_1', 'blog_title_2'];
  const contents = ['blog_content_1', 'blog_content_2'];

  titles.forEach((title, index) => {
      document.getElementById(title).style.display = (index + 1 === pageNumber) ? 'block' : 'none';
  });

  contents.forEach((content, index) => {
      document.getElementById(content).style.display = (index + 1 === pageNumber) ? 'block' : 'none';
  });
}

async function fetchBlogContent(fileUrl) {
  try {
      const response = await fetch(fileUrl);
      if (response.ok) {
          const content = await response.text();
          return content;
      } else {
          console.error(`Error fetching content from ${fileUrl}`);
          return null;
      }
  } catch (error) {
      console.error(`Error fetching content: ${error.message}`);
      return null;
  }
}

async function populateBlogPosts() {
  const blogContent1 = await fetchBlogContent('blog_posts_txt/blog_post_1.txt');
  const blogContent2 = await fetchBlogContent('blog_posts_txt/blog_post_2.txt');

  document.getElementById('blog_content_1').innerHTML = blogContent1 || 'Error loading content';
  document.getElementById('blog_content_2').innerHTML = blogContent2 || 'Error loading content';

  // Initially show only the first page
  showPage(1);
}

window.addEventListener('load', populateBlogPosts);