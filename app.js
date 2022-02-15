// Elementleri seçme 
const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");

const github = new Github();
const ui = new UI();
// const storage = new Storage();


eventlisteners();

function  eventlisteners(){
    
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);

}


function getData(e){

    let username = nameInput.value.trim();

    if(username === ""){
        alert("lütfen geçerli bir kullanıcı adı girin.");
    }
    else{

        github.getGithubData(username) // burda bir obje döneceği için bunu promise yapısıyla yakaladım  
        .then( response => {
            if (response.user.message === "Not Found") {
                ui.showError("Kullanıcı Bulunamadı");
            }
            else
            {
                ui.addSearchedUserUI(username); // UI üzerinde de kaydedilenleri görebilmek için 
                // Eğer ki index.html'de storage.js script'i ui.js'den sonra yazılsaydı UI class'ının içinde Storage class'ını kullanamazdım
                // aynı şekilde burdaki kodu da Storage'dan sonra yazarsan tekrardan aynı hatayı verir
                Storage.addSearchedUserToStorage(username); //  input'a girilen github hesabını localStorage'a kaydettim.
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => ui.showError(err));  // Promise'de hata olursa UI' daki hata mesajını gösterdim.
    }


    ui.clearInput(); // input temizleme
    e.preventDefault();

}


function clearAllSearched(){

    // tüm arananları temizle
    if(confirm("Emin misiniz?")){
        // silme
        Storage.clearAllSearchedUsersFromStorage(); // Storage'dan temizledim
        ui.clearAllSearchedUsersFromUI();
    }
}


function getAllSearched()
{
    // Arananları storage'dan al ve UI'ye ekle.
    let users = Storage.getSearchedUsersFromStorage();

    let result = "";
    users.forEach(user => {
        result += `<li class="list-group-item">${user}</li>`
    });

    lastUsers.innerHTML = result;

}



/* Gereksinimler */
/* 
    1. son aramaları sona göre sırala 
    2. Elementi tek tek sil 
    3. 
*/