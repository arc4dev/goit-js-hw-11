export const createCards = images => {
  const html = images
    .map(
      img => `
    <li class="w-80 shadow-md rounded-md overflow-hidden">
      <a href="${img.largeImageURL}"> 
        <figure>
          <div class="h-52">
            <img class="w-full h-full object-cover" src="${img.webformatURL}" alt="${img.tags}" />
          </div>
          <figcaption>
            <ul class="flex justify-around">
              <li>
                <h4 class="font-bold">Likes</h4>
                <p class="text-slate-500">${img.likes}</p>
              </li>
              <li>
                <h4 class="font-bold">Views</h4>
                <p class="text-slate-500">${img.views}</p>
              </li>
              <li>
                <h4 class="font-bold">Comments</h4>
                <p class="text-slate-500">${img.comments}</p>
              </li>
              <li>
                <h4 class="font-bold">Downloads</h4>
                <p class="text-slate-500">${img.downloads}</p>
              </li>
            </ul>
          </figcaption>
        </figure>
      </a>
    </li>`
    )
    .join('');

  return html;
};
