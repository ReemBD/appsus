var inputInfo = {
    cmps: [
        {
            type: 'textBox',
            info: {
                placeholder: 'Write a note'
            }
        },

        {
            type: 'imgUrl',
            info: {
                placeholder: 'Paste Image URL Here'
            }
        },

        {
            type: 'todos',
            info: {
                placeholder: 'Enter a comma seperated list'
            }
        },

        {
            type: 'videoUrl',
            info: {
                placeholder: 'Paste Video URL Here'
            }
        }
    ]
}

export class KeepNotes extends React.Component {

    state = {
        inputInfo,
        userSelection: ''
    }

    render() {
        const { inputInfo, userSelection } = this.state

        return (
            <section className='keep-input'>
                <form>
                    <DynamicInputCmp />
                </form>

            </section>
        )
    }
}
