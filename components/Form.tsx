import { FormEvent, MouseEvent, useState } from "react";
import { CardProps, Icon } from "./Card";

type AcceptableInputEvents = FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>;
type AcceptableClickEvents = MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;

interface FormProps {
    card: CardProps,
    setCardProps: (a: CardProps) => void
}

// Component
export default function Form(props: FormProps) {

    let [activeIcon, setActiveIcon] = useState<string>();
    const AVAILABLE_ICONS: string[] = Object.keys(Icon);

    const ICONS_ARRAY: JSX.Element[] = AVAILABLE_ICONS.map((ICON, INDEX) => {

        const IS_ACTIVE_ICON = ICON === activeIcon;
        const ACTIVE_CLASS = 'homepage-container__form-icon--active';

        return (

            <button
                key={ ICON }
                type="button"
                onClick={ EVENT => saveSelectedIcon(EVENT) }

                className={`
                    homepage-container__form-icon
                    ${ IS_ACTIVE_ICON ? ACTIVE_CLASS : '' }
                `}

                name="icon"
                value={ ICON }
            >
                
                { /* Label */ }
                { ICON }

                { /* Pop-up */ }
                <span className="popup homepage-container__form-icon-popup"> { ICON } { Icon[ICON as keyof typeof Icon] } </span>
                
            </button>
            
        );

    });

    // Render
    return (

        <article className="homepage-container__form">

            { /* Icons */ }
            <div className="homepage-container__form-icons"> { ICONS_ARRAY } </div>

            { /* Heading */ }
            <input
                type="text"
                name="heading"
                className="homepage-container__form-heading"
                placeholder="Inserisci un titolo..."
                maxLength={ 40 }
                autoComplete="off"
                onInput={ EVENT => validateValue(EVENT) }
            />

            { /* Description */ }
            <textarea
                name="description"
                className="homepage-container__form-textarea"
                placeholder="Inserisci una descrizione..."
                maxLength={ 120 }
                autoComplete="off"
                onInput={ EVENT => validateValue(EVENT) }
            ></textarea>

            { /* Grid */ }
            <section className="homepage-container__form-grid">

                { /* Color */ }
                <div className="homepage-container__form-color">

                    { /* Input */ }
                    <input
                        type="color"
                        name="color"
                        className="homepage-container__form-color"
                        onBlur={ EVENT => validateValue(EVENT) }
                        defaultValue="#3643B2"
                    />

                    { /* Pop-up */ }
                    <span className="popup homepage-container__form-color-popup">Seleziona un colore e poi chiudi la palette</span>

                </div>

                { /* Pattern */ }
                <button
                    type="button"
                    name="pattern"
                    className="button homepage-container__form-pattern"
                ></button>

            </section>

            { /* Button */ }
            <button
                type="button"
                className="button homepage-container__form-button"
                title="🚀 Scarica immagine"
                onClick={ props.downloadCard }
            >🚀 Scarica immagine</button>

        </article>

    );

    // Function to validate the input
    // before updating the Object
    function validateValue(EVENT: AcceptableInputEvents): void {

        const { PARAMETER_TO_UPDATE, VALUE } = sanitizeValue(EVENT);
        updateProps(PARAMETER_TO_UPDATE, VALUE);

    }

    // Function to retrieve the clicked icon
    function saveSelectedIcon(EVENT: AcceptableClickEvents): void {

        const { PARAMETER_TO_UPDATE, VALUE } = sanitizeValue(EVENT);
        updateProps(PARAMETER_TO_UPDATE, VALUE);

        // Set the selected element as active
        setActiveIcon(VALUE);

    }

    // Function to update the Object
    function updateProps(PARAMETER_TO_UPDATE: string, INPUT: string): void {

        // Create a new Object with the
        // updated values inside itself
        const UPDATED_CARD: CardProps = {
            ...props.card,
            [PARAMETER_TO_UPDATE]: INPUT
        };

        // Update the state
        props.setCardProps(UPDATED_CARD);

    }

}

// Function to sanitize a value and
// return its cleaned-up version
function sanitizeValue(EVENT: AcceptableInputEvents | AcceptableClickEvents) {

    const PARAMETER_TO_UPDATE = EVENT.currentTarget.name;
    const VALUE = EVENT.currentTarget.value.trim();

    return { PARAMETER_TO_UPDATE, VALUE };

}