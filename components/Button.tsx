interface ButtonProps {
    label: string,
    className?: string
}

// Component
export default function Button(props: ButtonProps) {

    return (

        <button
            type="button"
            className={`button ${ props.className }`}
            title={ props.label }
        > { props.label } </button>

    );

}