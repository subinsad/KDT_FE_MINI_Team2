import React from 'react';
import Button from '../Common/Button';
import Category from '../Common/Category';

function StayCategory({ onClick }) {
    return (
        <div className="flex gap-2">
            <Category text="전체" value="all" onClick={() => onClick('전체')} />
            <Category text="모텔" onClick={() => onClick('모텔')} />
            <Category text="호텔" onClick={() => onClick('호텔')} />
            <Category text="리조트" onClick={() => onClick('리조트')} />
            <Category text="펜션" onClick={() => onClick('펜션')} />
            <Category text="캠핑" onClick={() => onClick('캠핑')} />
            <Category
                text="게스트하우스"
                onClick={() => onClick('게스트하우스')}
            />
        </div>
    );
}

export default StayCategory;
