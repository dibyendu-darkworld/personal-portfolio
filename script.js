/* ===== typing animation =====*/
var typed = new Typed(".typing",{
    strings: ["","Student", "Web Developer", "Coder"],
    typeSpeed: 100,
    BackSpeed: 60,
    loop: true
}) 
/* ===== Aside =====*/
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;
    for(let i=0; i<totalNavList; i++){
        const a = navList[i].querySelector("a");
        a.addEventListener("click", function(){
            removebackSection();
            for(let j=0; j<totalNavList; j++){
                if(navList[j].querySelector("a").classList.contains("active")){
                    addBackSection(j);
                    // console.log("back-section" + navList[j].querySelector("a"))
                    //allSection[j].classList.add("back-section");
                }
                navList[j].querySelector("a").classList.remove("active");
            }
            this.classList.add("active")
            showSection(this);
            if(window.innerWidth <1200){
                asideSectionTogglerBtn();
            }
        })
    }
    function removebackSection(){
        for(let i =0; i<totalSection; i++){
            allSection[i].classList.remove("back-section");
        }
    }
    function addBackSection(num){
        allSection[num].classList.add("back-section");
    }
    function showSection(element){
        for(let i =0; i<totalSection; i++){
            allSection[i].classList.remove("active");
        }
        const target = element.getAttribute("href").split("#")[1];
        document.querySelector("#" + target).classList.add("active");
    }
    function updateNav(element){
        for(let i=0; i<totalNavList; i++){
            navList[i].querySelector("a").classList.remove("active");
            const target = element.getAttribute("href").split("#")[1];
            if(target == navList[i].querySelector("a").getAttribute("href").split("#")[1]){
                navList[i].querySelector("a").classList.add("active");
            }
        }
    }
    document.querySelector(".hire-me").addEventListener("click", function(){
        const sectionIndex = this.getAttribute(".data-section-index");
        //console.log(sectionIndex);
        showSection(this);
        updateNav(this);
        addBackSection(sectionIndex);
    })
    const navTogglerBtn = document.querySelector(".nav-toogler"),
        aside = document.querySelector(".aside");
        navTogglerBtn.addEventListener("click", () => {
            asideSectionTogglerBtn();
        });
        function asideSectionTogglerBtn() {
            aside.classList.toggle("open");
            navTogglerBtn.classList.toggle("open");
            for(let i = 0; i < totalSection; i++){
                allSection[i].classList.toggle("open");
            }
        }

    function submitForm() {
        // Get the form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Create the payload
            const payload = {
                name: name,
                email: email,
                subject: subject,
                message: message
            };
        
            // Send the AJAX request
            fetch('http://127.0.0.1:5000/save_contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();  // Attempt to parse JSON
            })
            .then(data => {
                console.log('Response JSON:', data);  // Log the response JSON
                if (data.success) {
                    alert('Message sent successfully!');
                } else {
                    alert('Failed to send message. Server responded with: ' + JSON.stringify(data));
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while sending the message.');
            });          
        }