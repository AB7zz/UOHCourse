var _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let total = 0
    for(let i=0; i<blogs.length; i++){
        total += blogs[i].likes
    }
    return total
}

const favoriteBlog = (blogs) => {
    let max = 0
    for(let i=0; i<blogs.length; i++){
        if(blogs[i].likes > blogs[max].likes){
            max = i
        }
    }

    return {
        title: blogs[max].title,
        author: blogs[max].author,
        likes: blogs[max].likes
    }
}

const mostBlogs = (blogs) => {
    const authorCounts = _.groupBy(blogs, 'author');
    const authorWithMostBlogs = _.maxBy(Object.keys(authorCounts), (author) => authorCounts[author].length);
    
    return {
        author: authorWithMostBlogs,
        blogs: authorCounts[authorWithMostBlogs].length
    }
}

const mostLikes = (blogs) => {
    const authorCounts = _.groupBy(blogs, 'author');
    const authorWithMostLikes = _.maxBy(Object.keys(authorCounts), (author) => _.sumBy(authorCounts[author], 'likes'));
    
    return {
        author: authorWithMostLikes,
        likes: _.sumBy(authorCounts[authorWithMostLikes], 'likes')
    }
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}