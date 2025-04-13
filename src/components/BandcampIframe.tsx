interface BandcampIframeProps {
    bcId: string;
    href: string;
}

const BandcampIframe: React.FC<BandcampIframeProps> = ({ bcId, href }) => {
    return (
        <iframe 
            style={{ border: 0, width: '320px', height: '42px' }}
            src={`https://bandcamp.com/EmbeddedPlayer/track=${bcId}/size=small/bgcol=000000/linkcol=FCEE22/artwork=none/transparent=true/`}
            title="Bandcamp Player">
            <a href={href || ''}>Listen on Bandcamp</a>
        </iframe>
    );
};

export default BandcampIframe;