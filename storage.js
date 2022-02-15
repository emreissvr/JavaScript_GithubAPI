class Storage{
    

    static getSearchedUsersFromStorage(){
        // arama kutusuna yazılmış tüm kullanıcıları aldım  

        let users;
        if (localStorage.getItem("searched") === null) {
        
            users = [];
        
        }
        else{
        
            users = JSON.parse(localStorage.getItem("searched"));  // array oluşturdum.
        
        }

        return users;

    }


    static addSearchedUserToStorage(username){
        // Her bir kullanıcıyı bir defa ekledim


        let users = this.getSearchedUsersFromStorage();

        // indexOf function -- username'i IndexOf ile sorguladım -1 çıkarsa bu username array'de yoktur.
        if(users.indexOf(username) === -1){
            
            users.push(username);

        }

        localStorage.setItem("searched",JSON.stringify(users));

    }


    static clearAllSearchedUsersFromStorage(){
        // Tüm kullanıcıları Sildim

        localStorage.removeItem("searched");


    }
}