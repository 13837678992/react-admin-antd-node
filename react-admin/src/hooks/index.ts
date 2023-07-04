import  { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
export function useScript(url: string) {
    // const location = useLocation();
    useEffect(() => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        document.body.appendChild(script);

        return () => {
            console.log('unmount', url);
            const scriptParent = script.parentNode;
            if (scriptParent) {
                scriptParent.removeChild(script);
            }
        };
    }, [url]);
}


