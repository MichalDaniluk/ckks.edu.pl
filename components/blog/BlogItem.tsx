import React from 'react';

import PageTop from '@components/PageTop';
import Header from '@components/Head';
import { BlogItem } from '@interfaces/BlogTypes';

function BlogItem(item:BlogItem) {

    return (
      <>
		<Header
			title={item.tytul}
			description={`blog ckks.pl ${item.tytul}`}
			query={`blog/${item.pid}`}
			image={item.plik_duzy ? `/blog/files/${item.plik_duzy}` : '/img/default-blog.jpg'}
			keywords={item.tytul}
		/>

		<PageTop
			title={item.tytul}
			bgImage={item.plik_duzy ? `/blog/files/${item.plik_duzy}` : '/img/default-blog.jpg'}
		/>
		<div dangerouslySetInnerHTML={{ __html: item.body }} />
      </>
    );
}

export default BlogItem;
