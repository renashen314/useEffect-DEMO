import { useState } from 'react';
import { useEffect } from 'react';
import useYesNoFetch from './component/useYesNoFetch';

function App() {
  const [yesNo, setYesNo] = useState(null)

  //useEffect without cleanup function
  useEffect(async () => {
    const res = await fetch('https://yesno.wtf/api')
    const json = await res.json()
    setYesNo(json);
  }, []);


  //useEffect with cleanup function
  useEffect(() => {
    async function getYesNo() {
      const res = await fetch('https://yesno.wtf/api')
      const json = await res.json()
      setYesNo(json);
    }
    return getYesNo();
  }, []);

  //useEffect controller.abort
  useEffect( async () => {
    const controller = new AbortController()
    const res = await fetch('https://yesno.wtf/api', { signal: controller.signal })
    const json = await res.json()
    setYesNo(json);

    return () => {
      controller.abort()
    }
  }, [])

 


  //IIFE
  useEffect(() => {
    (async () => {
      const res = await fetch('https://yesno.wtf/api')
      const json = await res.json()
      setYesNo(json);
    }) ()
  }, []);
   
 //customized hook
//  const { yesNo } = useYesNoFetch('https://yesno.wtf/api')


  return (
    <>
    <div>
    <h1>Enjoy 10 random dog pictures!</h1>
    <div className="col col-sm-8">
    {yesNo !== null && <><h3>{yesNo.answer}</h3><img src={yesNo.image} alt={yesNo.answer}/></>}
    </div>
    </div>
    </>
  );
}

export default App;
