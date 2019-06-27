const User = require('./models/user.js');
const Post = require('./models/post.js');
const db = require('./index.js');

// USERS
const ufuk = {
  username: 'ufukmehmetoglu',
  email: 'ufuk@ufuk.com',
  firstName: 'Ufuk',
  lastName: 'Mehmetoglu',
  avatar: 'https://avatars1.githubusercontent.com/u/43357768?s=460&v=4',
  password: 'password',
  location: 'Los Angeles, CA',
  followers: 3,
  following: ['Matt4theWin', 'kathog', 'calvin197', 'iAmVeryHandsome']
};

const matt = {
  username: 'Matt4theWin',
  email: 'matt@matt.com',
  firstName: 'Matt',
  lastName: 'Nguyen',
  avatar: 'https://avatars0.githubusercontent.com/u/45842060?s=460&v=4',
  password: 'password',
  location: 'Orange, CA',
  followers: 3,
  following: ['ufukmehmetoglu', 'kathog', 'calvin197', 'iAmVeryHandsome']
};

const kathleen = {
  username: 'kathog',
  email: 'kjh@kathleen.com',
  firstName: 'Kathleen',
  lastName: 'Hogan',
  avatar: 'https://avatars2.githubusercontent.com/u/25232945?s=460&v=4',
  password: 'password',
  location: 'Seattle, WA',
  followers: 3,
  following: ['ufukmehmetoglu', 'Matt4theWin', 'calvin197', 'iAmVeryHandsome']
};

const calvin = {
  username: 'calvin197',
  email: 'calvin@gmailz.com',
  firstName: 'Calvin',
  lastName: 'Shum',
  avatar: 'https://avatars2.githubusercontent.com/u/44663669?s=400&v=4',
  password: 'password',
  location: 'Calvin City, Hong Kong',
  followers: 3,
  following: ['ufukmehmetoglu', 'Matt4theWin', 'kathog', 'iAmVeryHandsome']
}

const james = {
  username: 'iAmVeryHandsome',
  email: 'james@kim.com',
  firstName: 'James',
  lastName: 'Kim',
  avatar: 'https://avatars0.githubusercontent.com/u/31761490?s=460&v=4',
  password: 'password',
  location: 'Gangnam, South Korea',
  followers: 4,
  following: ['ufukmehmetoglu', 'Matt4theWin', 'kathog', 'calvin197']
}

let userData = [ufuk, matt, kathleen, calvin, james];

// COMMENTS
const ufukComment1 = {
  text: 'I like this place too, man',
  author: {
    username: 'ufukmehmetoglu',
    avatar: 'https://avatars1.githubusercontent.com/u/43357768?s=460&v=4'
  },  
  createdAt: new Date()
};

const ufukComment2 = {
  text: 'This place looks disgusting, like.',
  author: {
    username: 'ufukmehmetoglu',
    avatar: 'https://avatars1.githubusercontent.com/u/43357768?s=460&v=4'
  },  
  createdAt: new Date()
};

const ufukComment3 = {
  text: 'We make this food better in Turkey. ;)',
  author: {
    username: 'ufukmehmetoglu',
    avatar: 'https://avatars1.githubusercontent.com/u/43357768?s=460&v=4'
  },  
  createdAt: new Date()
};

const ufukComment4 = {
  text: 'I\'m so drunk you guys',
  author: {
    username: 'ufukmehmetoglu',
    avatar: 'https://avatars1.githubusercontent.com/u/43357768?s=460&v=4'
  },  
  createdAt: new Date()
};

const mattComment1 = {
  text: 'LET\'S GO WORK OUT THOUGH',
  author: {
    username: 'Matt4theWin',
    avatar: 'https://avatars0.githubusercontent.com/u/45842060?s=460&v=4'
  },  
  createdAt: new Date()
};

const mattComment2 = {
  text: 'WALK? WALK? WALKWALKWALKWALKWALK?',
  author: {
    username: 'Matt4theWin',
    avatar: 'https://avatars0.githubusercontent.com/u/45842060?s=460&v=4'
  },  
  createdAt: new Date()
};

const mattComment3 = {
  text: 'Pushups? Tire flips?',
  author: {
    username: 'Matt4theWin',
    avatar: 'https://avatars0.githubusercontent.com/u/45842060?s=460&v=4'
  },  
  createdAt: new Date()
};

const mattComment4 = {
  text: 'Do you want a PB&J?',
  author: {
    username: 'Matt4theWin',
    avatar: 'https://avatars0.githubusercontent.com/u/45842060?s=460&v=4'
  },  
  createdAt: new Date()
};

const kathleenComment1 = {
  text: 'Can you not?',
  author: {
    username: 'kathog',
    avatar: 'https://avatars2.githubusercontent.com/u/25232945?s=460&v=4'
  },  
  createdAt: new Date()
};

const kathleenComment2 = {
  text: 'Lololololol nerd',
  author: {
    username: 'kathog',
    avatar: 'https://avatars2.githubusercontent.com/u/25232945?s=460&v=4'
  },  
  createdAt: new Date()
};

const kathleenComment3 = {
  text: 'I want Chipotle.',
  author: {
    username: 'kathog',
    avatar: 'https://avatars2.githubusercontent.com/u/25232945?s=460&v=4'
  },  
  createdAt: new Date()
};

const kathleenComment4 = {
  text: 'Matt pls be my friend.',
  author: {
    username: 'kathog',
    avatar: 'https://avatars2.githubusercontent.com/u/25232945?s=460&v=4'
  },  
  createdAt: new Date()
};

const calvinComment1 = {
  text: 'u guys drunk pussies?',
  author: {
    username: 'calvin197',
    avatar: 'https://avatars2.githubusercontent.com/u/44663669?s=400&v=4'
  },
  createdAt: new Date()
};

const calvinComment2 = {
  text: 'I solved today\'s toy problem in literally 40 seconds.',
  author: {
    username: 'calvin197',
    avatar: 'https://avatars2.githubusercontent.com/u/44663669?s=400&v=4'
  },
  createdAt: new Date()
};

const jamesComment1 = {
  text: '530 people offered me a job today.',
  author: {
    username: 'iAmVeryHandsome',
    avatar: 'https://avatars0.githubusercontent.com/u/31761490?s=460&v=4'
  },
  createdAt: new Date()
};

const jamesComment2 = {
  text: 'I am very rich and handsome.',
  author: {
    username: 'iAmVeryHandsome',
    avatar: 'https://avatars0.githubusercontent.com/u/31761490?s=460&v=4'
  },
  createdAt: new Date()
}

// POSTS 
const ufukPost1 = {
  restaurant: 'Salvo',
  title: 'This is the Best Meal Ever',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
  recommend: 'Yes',
  likes: 0,
  createdAt: new Date(),
  author: {
    username: 'ufukmehmetoglu',
    avatar: 'https://avatars1.githubusercontent.com/u/43357768?s=460&v=4'
  },
  comments: [mattComment1, kathleenComment1, calvinComment1]
};

const ufukPost2 = {
  restaurant: 'Bru House',
  title: 'I Can Cook Better Than This',
  text: 'Dolor sit amet consectetur adipiscing elit ut. Quam id leo in vitae turpis massa sed elementum tempus. Condimentum lacinia quis vel eros donec ac odio tempor orci. Urna neque viverra justo nec ultrices dui sapien eget mi. Morbi tristique senectus et netus et malesuada fames. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Sed elementum tempus egestas sed sed risus pretium. Nunc faucibus a pellentesque sit amet porttitor eget dolor. Lectus nulla at volutpat diam ut venenatis tellus. Urna molestie at elementum eu. Lorem donec massa sapien faucibus et.',
  image: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
  recommend: 'No',
  likes: 0,
  createdAt: new Date(),
  author: {
    username: 'ufukmehmetoglu',
    avatar: 'https://avatars1.githubusercontent.com/u/43357768?s=460&v=4'
  },
  comments: [mattComment2, kathleenComment4, jamesComment1]
};

const mattPost1 = {
  restaurant: 'Gastro Niche',
  title: 'They Had a Salad So I\'ll Only Work Out Once Today',
  text: 'Proin libero nunc consequat interdum varius sit amet. Nibh praesent tristique magna sit. Placerat duis ultricies lacus sed turpis. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat. Ullamcorper morbi tincidunt ornare massa eget egestas purus. Tincidunt augue interdum velit euismod in pellentesque. Auctor augue mauris augue neque gravida in fermentum et. Sagittis vitae et leo duis ut. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Aliquet eget sit amet tellus cras.',
  image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
  recommend: 'Yes',
  likes: 0,
  createdAt: new Date(),
  author: {
    username: 'Matt4theWin',
    avatar: 'https://avatars0.githubusercontent.com/u/45842060?s=460&v=4'
  },
  comments: [ufukComment1, kathleenComment3, calvinComment2]
};

const mattPost2 = {
  restaurant: 'Chez Marie',
  title: 'My Go-To Date Spot',
  text: 'Auctor augue mauris augue neque gravida in fermentum et. Sagittis vitae et leo duis ut. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Aliquet eget sit amet tellus cras. Morbi enim nunc faucibus a pellentesque sit amet. Sit amet facilisis magna etiam tempor orci eu lobortis. Odio ut enim blandit volutpat maecenas. Pellentesque elit eget gravida cum sociis. Ultrices vitae auctor eu augue ut lectus arcu bibendum. Donec massa sapien faucibus et molestie ac feugiat sed.',
  image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
  recommend: 'Yes',
  likes: 0,
  createdAt: new Date(),
  author: {
    username: 'Matt4theWin',
    avatar: 'https://avatars0.githubusercontent.com/u/45842060?s=460&v=4'
  },
  comments: [ufukComment2, kathleenComment2, jamesComment2]
};

const kathleenPost1 = {
  restaurant: 'Mama Sortini\'s',
  title: 'I Feel Fat and I Love It',
  text: 'Velit scelerisque in dictum non consectetur a erat nam. Nulla pharetra diam sit amet. Vel pretium lectus quam id leo in vitae turpis massa. Justo nec ultrices dui sapien. Venenatis tellus in metus vulputate. A cras semper auctor neque vitae tempus quam pellentesque. Lorem ipsum dolor sit amet consectetur. Sit amet tellus cras adipiscing enim eu. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Feugiat in ante metus dictum at tempor commodo.',
  image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&auto=format&fit=crop&w=1585&q=80',
  recommend: 'Yes',
  likes: 0,
  createdAt: new Date(),
  author: {
    username: 'kathog',
    avatar: 'https://avatars2.githubusercontent.com/u/25232945?s=460&v=4'
  },
  comments: [ufukComment3, mattComment3, calvinComment1]
};

const kathleenPost2 = {
  restaurant: 'The Little Pepper',
  title: 'This Place Made Me Want to Die',
  text: 'Ultricies mi eget mauris pharetra et ultrices. Tellus in hac habitasse platea. Suscipit adipiscing bibendum est ultricies integer quis auctor elit sed. Habitant morbi tristique senectus et netus et. Consequat interdum varius sit amet mattis vulputate enim. Elit at imperdiet dui accumsan sit amet nulla. Hendrerit gravida rutrum quisque non tellus orci ac. Imperdiet massa tincidunt nunc pulvinar sapien.',
  image: 'https://images.unsplash.com/photo-1453831362806-3d5577f014a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1938&q=80',
  recommend: 'No',
  likes: 0,
  createdAt: new Date(),
  author: {
    username: 'kathog',
    avatar: 'https://avatars2.githubusercontent.com/u/25232945?s=460&v=4'
  },
  comments: [ufukComment4, mattComment4, calvinComment2]
};

const calvinPost1 = {
  restaurant: 'Waffle House',
  title: 'I Ate Too Many Waffles',
  text: 'Ultricies mi eget mauris pharetra et ultrices. Tellus in hac habitasse platea. Suscipit adipiscing bibendum est ultricies integer quis auctor elit sed. Habitant morbi tristique senectus et netus et. Consequat interdum varius sit amet mattis vulputate enim. Elit at imperdiet dui accumsan sit amet nulla. Hendrerit gravida rutrum quisque non tellus orci ac. Imperdiet massa tincidunt nunc pulvinar sapien.',
  image: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
  recommend: 'Yes',
  likes: 0,
  createdAt: new Date(),
  author: {
    username: 'calvin197',
    avatar: 'https://avatars2.githubusercontent.com/u/44663669?s=400&v=4'
  },
  comments: [jamesComment2, mattComment3, ufukComment1, kathleenComment3]
};

const jamesPost1 = {
  restaurant: 'Liu\'s Dumplings',
  title: 'Look At These Dumplings',
  text: 'Ultricies mi eget mauris pharetra et ultrices. Tellus in hac habitasse platea. Suscipit adipiscing bibendum est ultricies integer quis auctor elit sed. Habitant morbi tristique senectus et netus et. Consequat interdum varius sit amet mattis vulputate enim. Elit at imperdiet dui accumsan sit amet nulla. Hendrerit gravida rutrum quisque non tellus orci ac. Imperdiet massa tincidunt nunc pulvinar sapien.',
  image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
  recommend: 'Yes',
  likes: 0,
  createdAt: new Date(),
  author: {
    username: 'iAmVeryHandsome',
    avatar: 'https://avatars0.githubusercontent.com/u/31761490?s=460&v=4'
  },
  comments: [calvinComment2, mattComment1, ufukComment4, kathleenComment2, calvinComment1]
};

let postData = [ufukPost1, ufukPost2, mattPost1, mattPost2, kathleenPost1, kathleenPost2, calvinPost1, jamesPost1];

// SEED
const insertUsers = () => {
  User.insertMany(userData)
  .then(() => {
    console.log('Successfully seeded users!');
  })
  .catch(err => {
    console.log('Could not seed users :(', err);
  });
};
const insertPosts = () => {
  Post.insertMany(postData)
  .then(() => {
    console.log('Successfully seeded posts!');
  })
  .catch(err => {
    console.log('Could not seed posts :(', err);
  });
};

insertUsers();
insertPosts();
