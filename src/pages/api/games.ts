// Next.js API route support:", href:"https://nextjs.org/docs/api-routes/introduction",},
import type { NextApiRequest, NextApiResponse } from 'next';

const allName = [
  {
    name: 'Hit It Slots',
    href: 'https://play.google.com/store/apps/details?id=com.hitit.slots.plinko.studio',
  },
  {
    name: 'Wild Legend - Slots Games',
    href: 'https://play.google.com/store/apps/details?id=com.wlsg.slotsgames.gp',
  },
  {
    name: "Thor's Vengeance Slots",
    href: 'https://play.google.com/store/apps/details?id=com.thorsvengeance.slots.studio',
  },
  {
    name: 'Spin Canival',
    href: 'https://play.google.com/store/apps/details?id=com.hitit.slots.plinko.studio',
  },
  {
    name: 'Wild Strike Slots',
    href: 'https://play.google.com/store/apps/details?id=com.hitit.slots.plinko.studio',
  },
  {
    name: 'Pop Million Slots',
    href: 'https://play.google.com/store/apps/details?id=com.hitit.slots.plinko.studio',
  },
  {
    name: 'Royal Jackpot Slots',
    href: 'https://play.google.com/store/apps/details?id=com.hitit.slots.plinko.studio',
  },
  {
    name: 'Ancient Blessing-Slot Machines',
    href: 'https://play.google.com/store/apps/details?id=com.wlsg.slotsgames.gp',
  },
  {
    name: 'Scarabs Slots',
    href: 'https://play.google.com/store/apps/details?id=com.wlsg.slotsgames.gp',
  },
  {
    name: 'Mystery Reels Slots - Deluxe',
    href: 'https://play.google.com/store/apps/details?id=com.wlsg.slotsgames.gp',
  },
  {
    name: 'Sphinx Riddle Slots',
    href: 'https://play.google.com/store/apps/details?id=com.thorsvengeance.slots.studio',
  },
  {
    name: 'Wild Craze - Casino Slots',
    href: 'https://play.google.com/store/apps/details?id=com.thorsvengeance.slots.studio',
  },
  {
    name: 'Hyper Slots',
    href: 'https://play.google.com/store/apps/details?id=com.thorsvengeance.slots.studio',
  },
  {
    name: 'Tricks & Treats - Scratch Card',
    href: 'https://play.google.com/store/apps/details?id=com.trickstreats.scratch.card.studio',
  },
  {
    name: 'Green Green Scratch',
    href: 'https://play.google.com/store/apps/details?id=com.green.green.scratch.casual.gp',
  },
  {
    name: 'Scratch Craze - Lucky Coins',
    href: 'https://play.google.com/store/apps/details?id=com.sclc.cottoncraze.studio',
  },
  {
    name: 'Quick Scratch - Daily Card',
    href: 'https://play.google.com/store/apps/details?id=com.green.green.scratch.casual.gp',
  },
  {
    name: 'Scratch It - To Win',
    href: 'https://play.google.com/store/apps/details?id=com.green.green.scratch.casual.gp',
  },
  {
    name: 'Scratch & Match Big Win',
    href: 'https://play.google.com/store/apps/details?id=com.green.green.scratch.casual.gp',
  },
  {
    name: 'Scratch Winner - Lucky Plinko',
    href: 'https://play.google.com/store/apps/details?id=com.green.green.scratch.casual.gp',
  },
  {
    name: 'Jackpot Winner-Scratch for Fun',
    href: 'https://play.google.com/store/apps/details?id=com.sclc.cottoncraze.studio',
  },
  {
    name: 'KK Scratch',
    href: 'https://play.google.com/store/apps/details?id=com.green.green.scratch.casual.gp',
  },
  {
    name: 'Monday Scratch',
    href: 'https://play.google.com/store/apps/details?id=com.green.green.scratch.casual.gp',
  },
  {
    name: 'Coffee Time',
    href: 'https://play.google.com/store/apps/details?id=com.sclc.cottoncraze.studio',
  },
  {
    name: 'Fast Scratch Master',
    href: 'https://play.google.com/store/apps/details?id=com.sclc.cottoncraze.studio',
  },
  {
    name: 'Scratch.Enjoy.Win',
    href: 'https://play.google.com/store/apps/details?id=com.green.green.scratch.casual.gp',
  },
  {
    name: 'Clover Pack',
    href: 'https://play.google.com/store/apps/details?id=com.sclc.cottoncraze.studio',
  },
  {
    name: 'Bingo Craze',
    href: 'https://play.google.com/store/apps/details?id=com.seenercraze.bingocraze.gp',
  },
  {
    name: 'Bingo Yeah',
    href: 'https://play.google.com/store/apps/details?id=com.seenercraze.bingocraze.gp',
  },
  {
    name: 'Bingo Mania - Space Winner',
    href: 'https://play.google.com/store/apps/details?id=com.seenercraze.bingocraze.gp',
  },
  {
    name: 'Bingo Master - Pandora',
    href: 'https://play.google.com/store/apps/details?id=com.seenercraze.bingocraze.gp',
  },
  {
    name: 'Bingo Dream - POP BINGO Games',
    href: 'https://play.google.com/store/apps/details?id=com.seenercraze.bingocraze.gp',
  },
  {
    name: 'Bingo Yes',
    href: 'https://play.google.com/store/apps/details?id=com.seenercraze.bingocraze.gp',
  },
  {
    name: 'Bingo Play - Unlimited',
    href: 'https://play.google.com/store/apps/details?id=com.seenercraze.bingocraze.gp',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let data = allName.map((item, idx) => {
    const { name } = item;
    const id = idx + 1;
    return {
      id: id,
      tag: id % 3,
      href: item.href,
      name: name.split('.').shift(),
      like: 80,
      imgProps: {
        src: `/assets/games/${name}.png`,
        title: name,
        alt: name,
      },
    };
  });

  const { search } = req.query;
  if (search === 'string') {
    data = data.filter((i) => i.name?.includes(search));
  }
  console.log('data', data);

  res.status(200).json({
    data: data,
  });
}
