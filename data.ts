
import { Book, User, BorrowRecord } from './types';

export const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: '了不起的盖茨比',
    author: 'F. 斯科特·菲茨杰拉德',
    isbn: '978-0743273565',
    status: 'in-library',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9s5UHf2GB6QHrVk1lpXpHRch1UB8j1FDvgWWtuvKsjDLJ1EQeG4bTbmyDiBrBKJd2_hgZ5B2w8oUq-TTvhCfyMhhDsx8K4-TPUeNd8971u1vINYrgruCJNkNleBVILv70shv3Ql3k2dEtUzqkt7oRBHXg22QKIa7AI7E7io82lFEXQR_kaiEM5Z9_tXKLE88SSPWqy17l2Lvb81o34Vd0h09ld6Vp-mHNv4tJEWr1QCW7ahIMGqP3sSsuoCSUGNqLFhRkJcixSeY',
    description: '《了不起的盖茨比》是弗朗西斯·斯科特·菲茨杰拉德的第三部小说，也是他职业生涯的最高成就。这部关于爵士时代的典范小说受到了几代读者的赞誉。',
    publisher: 'Scribner',
    year: '1925',
    pages: 180,
    language: '中文',
    location: '书架 B3, 第 2 排',
    category: '经典文学'
  },
  {
    id: '2',
    title: '1984',
    author: '乔治·奥威尔',
    isbn: '978-0451524935',
    status: 'lent-out',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe5Jv9QzzIU_dmbtnZrlsmONECSg4n8FR-oG2wFC8xUSqIoDk60gvWSpJWqLVtcj2OL5jIXd3uwdoJl9uvvW9U6rI35dqi8wxATvYZf_cqupIEgs70kXe_DcOXDk5hk0uCqpal9gJ9eoqPM-bCMV4_oIXGK3A6FbJh_8DI3ZJJgEHs6VdICd0jf52__-tmUHbL1fsA6ZXHsXdD8WeSka7md25pCoT1Y6CSgOGNrGJ74BwKyEBMKdp35HoShXm-WAenysNY1P86ldc',
    description: '1984是奥威尔的一部反乌托邦小说。作品刻画了一个极权主义社会。',
    publisher: 'Secker & Warburg',
    year: '1949',
    pages: 328,
    language: '中文',
    location: '书架 A1, 第 1 排',
    category: '小说'
  },
  {
    id: '3',
    title: '杀死一只知更鸟',
    author: '哈珀·李',
    isbn: '978-0061120084',
    status: 'in-library',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCe6pzJeIGp0lQLdUTRnFI2bO47nmPQHbol819XcAA-EBrWh1ZPUeELXO5xKMtzPFI4iFaRkc9fz4BJcYzSBjPgA6pAXS2DDZYfyqav1iX2XfzgyTJuXdj1b76fMjvY0nRWIhAq9fK6ywXUdfYiTIVl1vwhQ4FHgXFaqBtenO7XtWIAZuDJqQNAwgN2kTzq_apbwEzqNVNS5LBkIMMlMNiZQOJZQ_yyJSQRJDED6h9IHlvoTDjEtRDeZ-0VzUbRhbkuTadWF7dLtvM',
    description: '通过小女孩斯考特的视角，讲述了发生在美国南方小镇梅科姆的故事。',
    publisher: 'J.B. Lippincott & Co.',
    year: '1960',
    pages: 281,
    language: '中文',
    location: '书架 B2, 第 4 排',
    category: '经典文学'
  },
  {
    id: '4',
    title: '麦田里的守望者',
    author: 'J.D. 塞林格',
    isbn: '978-0316769488',
    status: 'lost',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaPb7xonqPjsIjTl1x9ioyLENAhZ6XNookW35idu2e9VGyjnj7mA9uR5dCxlfTpz9ybz1ndExPRNNZGG7ZstXAWlW3Y7yYXjoVemns5cqMqghSZmr_OGSKAMohTOV6-MNOFQgJtS2lZCuR9FKQ1GCDqj19KbSOFgAH8qzhfT_2FEO-RJl96OjkTNEozVmAhENadcDQWCZKJ-llWn5_19jXcFuTPMMtrduNDgGAJpavhF65hwA31Q1OEl4dQuH4rYxIL1Wik3LZdrQ',
    description: '讲述了少年霍尔顿在纽约游荡三天的故事。',
    publisher: 'Little, Brown and Company',
    year: '1951',
    pages: 214,
    language: '中文',
    location: '未知',
    category: '经典文学'
  },
  {
    id: '5',
    title: '沙丘',
    author: '弗兰克·赫伯特',
    isbn: '978-0441172719',
    status: 'in-library',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOg9ZO9dKW1lyqvHAS2vsZ35fPXyKYLUAU_Fs4Zysr7Jpp5RyIslSte315UNA3x7YEmN2xZV__E-moN9d4G-GygpPNn8asAfVCLi2bdurT709ppyg9pAmU64EltKvdR9Zj_ReDwp92inqJqovWWeiezjWyFXEvjO0FuolHVgqk3lQE5vmFhTquAoKdBkF9RQ9S96mmL23v4Wt49flGNAWSNrN5pLE1JvWD8qOjYPi-ZVSC9jF61RTrI-EBY0ucKMThY27r10CxInA',
    description: '史诗般的科幻小说，讲述了年轻的保罗·亚崔迪在阿拉基斯星球上的命运。',
    publisher: 'Chilton Books',
    year: '1965',
    pages: 412,
    language: '中文',
    location: '书架 D5, 第 1 排',
    category: '科幻'
  },
  {
    id: '6',
    title: '傲慢与偏见',
    author: '简·奥斯汀',
    isbn: '978-1503290563',
    status: 'lent-out',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaWkS-5z-2hgsuLToEoufZRFwNlM2xfeiu-ZM3b8j_vVqCSdelxTRLkiLPLP9mCik6mwNJ7H2xCRl0pQSedpMR_WVC8cTfk70WQ2TZqGocelC_kI6-I2qePV6lYG7bYrul9tS1ajvgRK1y346MEhy9Ow7h7xeECjgMBoeXox5r1obenGZgbQDFRdtAd5nsWiVprcPV9aNYfU_cSVA5GdZH1aFjhze4IYCweDXUk1ixkPGMgNniQ202cyBTBCfIEs1pZs6OD4U1gh8',
    description: '描绘了19世纪英国乡绅阶层的婚恋和社会。',
    publisher: 'T. Egerton',
    year: '1813',
    pages: 432,
    language: '中文',
    location: '书架 C2, 第 3 排',
    category: '经典文学'
  }
];

export const MOCK_RECORDS: BorrowRecord[] = [
  {
    id: 'r1',
    readerName: 'John Doe',
    readerId: '#8492',
    borrowDate: '2023年10月12日',
    dueDate: '2023年10月26日',
    returnDate: '2023年10月25日',
    status: 'returned',
    readerAvatar: 'https://picsum.photos/seed/john/40/40'
  },
  {
    id: 'r2',
    readerName: 'Sarah Jenkins',
    readerId: '#9921',
    borrowDate: '2023年09月01日',
    dueDate: '2023年09月15日',
    returnDate: '2023年09月18日',
    status: 'overdue'
  },
  {
    id: 'r3',
    readerName: 'Mike Ross',
    readerId: '#1124',
    borrowDate: '2023年08月14日',
    dueDate: '2023年08月28日',
    returnDate: '2023年08月27日',
    status: 'returned',
    readerAvatar: 'https://picsum.photos/seed/mike/40/40'
  }
];

export const MOCK_USERS: User[] = [
  { id: 'u1', name: '张伟', email: 'zhangwei@email.com', phone: '13800138000', registrationDate: '2023-10-24', activeBorrowCount: 3, status: 'normal', avatarInitials: 'ZW' },
  { id: 'u2', name: '李娜', email: 'lina@email.com', phone: '13900139000', registrationDate: '2023-10-25', activeBorrowCount: 0, status: 'suspended', avatarInitials: 'LN' },
  { id: 'u3', name: '王强', email: 'wang.q@example.com', phone: '13712345678', registrationDate: '2023-10-26', activeBorrowCount: 1, status: 'normal', avatarInitials: 'WQ' },
  { id: 'u4', name: '赵敏', email: 'zhaomin@example.com', phone: '13700137000', registrationDate: '2023-10-27', activeBorrowCount: 5, status: 'normal', avatarInitials: 'ZM' },
  { id: 'u5', name: '孙杰', email: 'sun.jie@example.com', phone: '15544332211', registrationDate: '2023-10-28', activeBorrowCount: 2, status: 'normal', avatarInitials: 'SJ' },
];
