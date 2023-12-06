export enum Icon {
    '🎂' = 'Torta',
    '😁' = 'Sorriso',
    '😍' = 'Innamorato',
    '🏟️' = 'Festa',
    '💝' = 'Cuore',
    '🥳' = 'Festeggiamento',
    '🌼' = 'Fiore'
}

export interface CardProps {
    icon?: keyof typeof Icon | null,
    heading?: string | null,
    description?: string | null,
    color?: string | null
}

interface CardPropsAdditional {
    color: string
}

// Component
export default function Card(props: CardProps & CardPropsAdditional) {

    const FALLBACK_ICON = '🎂';
    const FALLBACK_HEADING = 'Felice compleanno, e tantissimi auguri!';
    const FALLBACK_DESCRIPTION = 'Questa magnifica giornata è dedicata a te: goditi tutto il tempo a tua disposizione, e circondati di amore e cibo!';

    return (

        <article className="homepage-result__card">

            { /* Pattern */ }
            <div
                className="homepage-result__card-pattern"
                style={ { backgroundColor: props.color } }
            ></div>

            { /* Icon */ }
            <span className="homepage-result__card-icon"> { props.icon || FALLBACK_ICON } </span>

            { /* Content */ }
            <div className="homepage-result__card-content">

                { /* Heading */ }
                <h1 className="homepage-result__card-heading"> { props.heading || FALLBACK_HEADING } </h1>

                { /* Description */ }
                <p className="homepage-result__card-description"> { props.description || FALLBACK_DESCRIPTION } </p>

            </div>

        </article>

    );

}