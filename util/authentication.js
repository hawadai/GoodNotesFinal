function createUserSession(req,user,action){
    req.session.uid = user._id.toString();
    req.session.isAdmin = user.isAdmin;
    req.session.save(action);
}

function destroyUserAuthSession(req) {
    req.session.uid = null;
    //dont have to save because express does it no error here//
}

module.exports={
    createUserSession: createUserSession,
    destroyUserAuthSession: destroyUserAuthSession
};