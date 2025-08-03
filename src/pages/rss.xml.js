import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const allNewsletter = await getCollection("newsletter");
    const sortedNewsletter = allNewsletter.sort(
        (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
    );

    const numberOfWeeks = sortedNewsletter.length;
    const items = sortedNewsletter.map((week, index) => ({
        title: `Week ${numberOfWeeks - index} - It's time to level up your skills!`,
        description: week.data.description,
        link: `/week/${numberOfWeeks - index}`,
        pubDate: new Date(week.data.date),
    }));

    return rss({
        title: 'Code & Beverage',
        description: 'Your weekly suggestion of Web Development videos to watch while drinking your favorite beverage.',
        site: context.site,
        items,
        customData: `<language>en-us</language>`,
    });
}