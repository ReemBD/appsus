export function emailList({ emails, onRemoveEmail, onAddEmail }) {
    return (
        <section className="email-list">
            {emails.map(email => {
                return <emailPreview key={email.id} email={email}
                    onRemoveEmail={onRemoveEmail} onAddEmail={onAddEmail} />;
            })}
        </section>
    )
}