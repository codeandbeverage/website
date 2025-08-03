import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const allNewsletter = await getCollection("newsletter");
    const sortedNewsletter = allNewsletter.sort(
        (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
    );
    const items = sortedNewsletter.flatMap(week => week.data.content.map(post => ({
        title: post.title,
        description: post.description,
        link: post.link
    })));

    return rss({
        title: 'Code & Beverage',
        description: 'Your weekly suggestion of Web Development videos to watch while drinking your favorite beverage.',
        site: context.site,
        items,
        customData: `<language>en-us</language>`,
    });
}