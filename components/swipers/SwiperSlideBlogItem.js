import React from 'react';
const SwiperSlideBlogItem = ({ blog }) => {
  return (
    <div>
      <h3 className="block" data-title="Blog">
        {blog.nazwa}
      </h3>
      <p className="block w-[20rem] md:w-[50rem] md:ml-[20rem] lg:ml-[15rem] ml-4 mt-[21rem] lg:mt-[20rem]">
        {blog.zajawka}
      </p>
      <a href={'/blog/' + blog.href} alt="">
        <button className="see-more-btn">Więcej</button>
      </a>
    </div>
  );
};

export default SwiperSlideBlogItem;
