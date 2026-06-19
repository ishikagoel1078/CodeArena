const registerForm = document.getElementById("registerForm");

if(registerForm){

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const response = await fetch("http://localhost:5000/register",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password
            })

        });

        const data = await response.json();

        alert(data.message);

        if(data.success){
            window.location.href="login.html";
        }

    });

}
async function loginUser() {

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch("http://localhost:5000/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email,
            password
        })

    });

    const data = await response.json();

    alert(data.message);

    if(data.success) {

    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(data.user)
    );

    window.location.href = "dashboard.html";
}
}
function logoutUser() {

    localStorage.removeItem("loggedInUser");

    window.location.href = "login.html";
}
function openProblem(title)
{
    console.log("Saving:", title);

    localStorage.setItem(
        "selectedProblem",
        title
    );

    window.location.href =
        "problem.html";
}
if(document.getElementById("problemTitle"))
{
    document.getElementById(
        "problemTitle"
    ).innerText =
        localStorage.getItem(
            "currentProblem"
        );
}
function submitCode()
{
    let code =
        document.getElementById("code").value;

    if(code === "")
    {
        alert("Write some code first");
        return;
    }

    alert("Solution Submitted Successfully!");
}