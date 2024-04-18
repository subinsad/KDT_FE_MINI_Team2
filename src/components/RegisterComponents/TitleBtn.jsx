import React from 'react';
import TItle from '../Common/Title';
import { Link } from 'react-router-dom';

function TitleBtn({ TitleText, LinkTo, text, className }) {
    return (
        <div className="flex justify-between">
            <TItle tag="h2" text={TitleText} className="mb-2" />
            <Link
                to={LinkTo}
                className={`font-bold py-3 px-4 h-10 rounded bg-primary text-white hover:bg-[#34a1e0] active:bg-primary ${className}`}>
                {text}
            </Link>
        </div>
    );
}

export default TitleBtn;
