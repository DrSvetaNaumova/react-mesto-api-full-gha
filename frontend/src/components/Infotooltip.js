import React from 'react';

function Infotooltip({ infoToolTipPopupData, setInfoToolTipPopupData }) {
  return (
    <section
      className={`pop-up ${infoToolTipPopupData ? 'pop-up_opened' : ''}`}
      onClick={() => setInfoToolTipPopupData(null)}
    >
      <div
        className="pop-up__container pop-up__container_type_infotool"
        onClick={(evt) => evt.stopPropagation()}
      >
        <div
          className={
            infoToolTipPopupData &&
            (infoToolTipPopupData.state === 'success'
              ? 'infotool__resultIcon_type_success'
              : 'infotool__resultIcon_type_failure')
          }
        ></div>
        <h2 className="pop-up__heading pop-up__heading_type_infotool">
          {infoToolTipPopupData && infoToolTipPopupData.message}
        </h2>
        <button
          className="pop-up__close-button"
          type="button"
          onClick={() => setInfoToolTipPopupData(null)}
        ></button>
      </div>
    </section>
  );
}

export default Infotooltip;
