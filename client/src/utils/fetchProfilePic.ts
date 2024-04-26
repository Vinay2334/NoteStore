function fetchProfilePic(profile_pic: string|undefined|null, email: string){
    if(profile_pic){
        return profile_pic;
    }
    return `http://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${email}`;
}

export default fetchProfilePic;