import React from 'react';
import { PhoneInfoProvider } from './InfoContext';
import TestInfos from './TestInfos';

function Test(){
    return(
        <div>
            <PhoneInfoProvider>
                <TestInfos/>
            </PhoneInfoProvider>
        </div>
    );
}
export default Test