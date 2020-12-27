

export function About() {
    return (
        <section className="about-page">
            <div className="team-members">

                <h2>Meet the team</h2>
                <div className="team-member">
                    <div className="member-info">
                        <h4>Reem Ben-David</h4>
                        <img src="./assets/img/team/reem.jpeg" alt="" />
                        <p>My name is Reem Ben-David. 24 Years Old from Petah Tikva. Adore creative thinking and always enjoy a good laugh.</p>
                    </div>
                </div>

                <div className="team-member">
                    <div className="member-info">
                        <h4>Yehonathan Segev</h4>
                        <img src="./assets/img/team/yoni.png" alt="" />
                        <p>An aspiring full stack developer, can't let a day pass without learning new things. <br /> Currently enrolled in the Coding Academy Bootcamp
                    <br />
                    23 years old from Ashdod
                    </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
