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
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}