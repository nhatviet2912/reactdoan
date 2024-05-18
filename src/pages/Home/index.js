import classNames from 'classnames/bind';
import styles from '../../assets/css/main.module.scss';

const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('main-content')}>
            <div className={cx('page__title')}>
                <h4>Dashboard</h4>
            </div>

            <section className={cx('firts-section')}>
                <div className={cx('report')}>
                    <div className="report__card report__box">
                        <div className="report__box-header">
                            <div className="report__container">
                                <p className="report__title--normal">Số lớp học</p>
                                <h5 id="numberclassName" className="report__data">
                                    28
                                </h5>
                            </div>

                            <div className="report__icon">
                                <i className="far fa-users-className"></i>
                            </div>
                        </div>

                        <div className="report__box-bottom">
                            <div className="report__box-index">
                                <i className="fas fa-caret-up">5%</i>
                            </div>
                            <div className="report__box-time">
                                <p>kể từ lần cuối cập nhật</p>
                            </div>
                        </div>
                    </div>

                    <div className="report__card report__box">
                        <div className="report__box-header">
                            <div className="report__container">
                                <p className="report__title--normal">Số sinh viên</p>
                                <h5 id="numberStudent" className="report__data">
                                    23
                                </h5>
                            </div>

                            <div className="report__icon">
                                <i className="fas fa-user-graduate"></i>
                            </div>
                        </div>

                        <div className="report__box-bottom">
                            <div className="report__box-index">
                                <i className="fas fa-caret-up">5%</i>
                            </div>
                            <div className="report__box-time">
                                <p>kể từ lần cuối cập nhật</p>
                            </div>
                        </div>
                    </div>

                    <div className="report__card report__box">
                        <div className="report__box-header">
                            <div className="report__container">
                                <p className="report__title--normal">Số giảng viên</p>
                                <h5 id="numberTeacher" className="report__data">
                                    12
                                </h5>
                            </div>

                            <div className="report__icon">
                                <i className="fad fa-chalkboard-teacher"></i>
                            </div>
                        </div>

                        <div className="report__box-bottom">
                            <div className="report__box-index">
                                <i className="fas fa-caret-up">5%</i>
                            </div>
                            <div className="report__box-time">
                                <p>kể từ lần cuối cập nhật</p>
                            </div>
                        </div>
                    </div>

                    <div className="report__card report__chart--pie report__specialized">
                        <div className="report__chart--pie-header">
                            <div className="report__container">
                                <p className="report__title--bold">Thống kê chuyên ngành</p>
                            </div>

                            <div className="report__icon">
                                <i className="far fa-city"></i>
                            </div>
                        </div>

                        <div className="report__chart--pie-body">
                            <div className="report__chart--pie-show"></div>
                        </div>

                        <div className="report__chart--pie-bottom">
                            <div className="report__chart--pie-item">
                                <div className="report__chart--pie-title">
                                    <div className="report__chart--pie-dots"></div>
                                    <p>CNW</p>
                                </div>

                                <div className="report__chart--pie-parameter">
                                    <h5>33%</h5>
                                </div>
                            </div>

                            <div className="report__chart--pie-item">
                                <div className="report__chart--pie-title">
                                    <div className="report__chart--pie-dots"></div>
                                    <p>CNDD</p>
                                </div>

                                <div className="report__chart--pie-parameter">
                                    <h5>33%</h5>
                                </div>
                            </div>

                            <div className="report__chart--pie-item">
                                <div className="report__chart--pie-title">
                                    <div className="report__chart--pie-dots"></div>
                                    <p>KTPM</p>
                                </div>
                                <div className="report__chart--pie-parameter">
                                    <h5>34%</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="report__card report__chart--pie report__system">
                        <div className="report__chart--pie-header">
                            <div className="report__container">
                                <p className="report__title--bold">Tình trạng hệ thống</p>
                            </div>

                            <div className="report__icon">
                                <i className="far fa-server"></i>
                            </div>
                        </div>

                        <div className="report__chart--pie-body">
                            <div className=".report__chart--pie-item">
                                <div className="report__chart--pie-show">
                                    {/* <svg id="SvgjsSvg1130" width="165" height="61" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" className="apexcharts-svg" xmlns:data="ApexChartsNS" transform="translate(0, 0)"
                                        style="background: transparent;"><g id="SvgjsG1132" className="apexcharts-inner apexcharts-graphical" transform="translate(52.5, 0)"><defs id="SvgjsDefs1131"><clipPath id="gridRectMask0runaavn"><rect id="SvgjsRect1134" width="66" height="62" x="-3" y="-1" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath><clipPath id="gridRectMarkerMask0runaavn"><rect id="SvgjsRect1135" width="64" height="64" x="-2" y="-2" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath></defs><g id="SvgjsG1136" className="apexcharts-radialbar"><g id="SvgjsG1137"><g id="SvgjsG1138" className="apexcharts-tracks"><g id="SvgjsG1139" className="apexcharts-radialbar-track apexcharts-track" rel="1"><path id="apexcharts-radialbarTrack-0" d="M 30 7.317073170731707 A 22.682926829268293 22.682926829268293 0 1 1 29.9960410824485 7.317073516212435" fill="none" fill-opacity="1" stroke="rgba(242,242,242,0.85)" stroke-opacity="1" stroke-linecap="round" stroke-width="4.258536585365854" stroke-dasharray="0" className="apexcharts-radialbar-area" data:pathOrig="M 30 7.317073170731707 A 22.682926829268293 22.682926829268293 0 1 1 29.9960410824485 7.317073516212435"></path></g></g><g id="SvgjsG1141"><g id="SvgjsG1143" className="apexcharts-series apexcharts-radial-series" seriesName="seriesx1" rel="1" data:realIndex="0"><path id="SvgjsPath1144" d="M 30 7.317073170731707 A 22.682926829268293 22.682926829268293 0 1 1 7.733822424235914 34.32810648049236" fill="none" fill-opacity="0.85" stroke="rgba(86,100,210,0.85)" stroke-opacity="1" stroke-linecap="round" stroke-width="4.390243902439025" stroke-dasharray="0" className="apexcharts-radialbar-area apexcharts-radialbar-slice-0" data:angle="259" data:value="72" index="0" j="0" data:pathOrig="M 30 7.317073170731707 A 22.682926829268293 22.682926829268293 0 1 1 7.733822424235914 34.32810648049236"></path></g><circle id="SvgjsCircle1142" r="20.553658536585367" cx="30" cy="30" className="apexcharts-radialbar-hollow" fill="transparent"></circle></g></g></g></g><g id="SvgjsG1133" className="apexcharts-annotations"></g></svg> */}
                                </div>

                                <div className="report__title--bold text-center">
                                    <h4>CPU</h4>
                                </div>
                            </div>

                            <div className=".report__chart--pie-item">
                                <div className="report__chart--pie-show">
                                    {/* <svg id="SvgjsSvg1147" width="165" height="61" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" className="apexcharts-svg" xmlns:data="ApexChartsNS" transform="translate(0, 0)"
                                        style="background: transparent;"><g id="SvgjsG1149" className="apexcharts-inner apexcharts-graphical" transform="translate(52.5, 0)"><defs id="SvgjsDefs1148"><clipPath id="gridRectMask8jx6q02i"><rect id="SvgjsRect1151" width="66" height="62" x="-3" y="-1" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath><clipPath id="gridRectMarkerMask8jx6q02i"><rect id="SvgjsRect1152" width="64" height="64" x="-2" y="-2" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath></defs><g id="SvgjsG1153" className="apexcharts-radialbar"><g id="SvgjsG1154"><g id="SvgjsG1155" className="apexcharts-tracks"><g id="SvgjsG1156" className="apexcharts-radialbar-track apexcharts-track" rel="1"><path id="apexcharts-radialbarTrack-0" d="M 30 7.317073170731707 A 22.682926829268293 22.682926829268293 0 1 1 29.9960410824485 7.317073516212435" fill="none" fill-opacity="1" stroke="rgba(242,242,242,0.85)" stroke-opacity="1" stroke-linecap="round" stroke-width="4.258536585365854" stroke-dasharray="0" className="apexcharts-radialbar-area" data:pathOrig="M 30 7.317073170731707 A 22.682926829268293 22.682926829268293 0 1 1 29.9960410824485 7.317073516212435"></path></g></g><g id="SvgjsG1158"><g id="SvgjsG1160" className="apexcharts-series apexcharts-radial-series" seriesName="seriesx1" rel="1" data:realIndex="0"><path id="SvgjsPath1161" d="M 30 7.317073170731707 A 22.682926829268293 22.682926829268293 0 1 1 11.649126712958513 43.33268986907318" fill="none" fill-opacity="0.85" stroke="rgba(28,187,140,0.85)" stroke-opacity="1" stroke-linecap="round" stroke-width="4.390243902439025" stroke-dasharray="0" className="apexcharts-radialbar-area apexcharts-radialbar-slice-0" data:angle="234" data:value="65" index="0" j="0" data:pathOrig="M 30 7.317073170731707 A 22.682926829268293 22.682926829268293 0 1 1 11.649126712958513 43.33268986907318"></path></g><circle id="SvgjsCircle1159" r="20.553658536585367" cx="30" cy="30" className="apexcharts-radialbar-hollow" fill="transparent"></circle></g></g></g></g><g id="SvgjsG1150" className="apexcharts-annotations"></g></svg> */}
                                </div>

                                <div className="report__title--bold text-center">
                                    <h4>RAM</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="report__card report__chart--column">
                        <div className="report__chart--column-header">
                            <div className="report__chart--column-content">
                                <p className="report__title--bold">Tình trạng sinh viên</p>
                            </div>

                            <div className="report__icon">
                                <i className="fas fa-school"></i>
                            </div>
                        </div>

                        <div className="report__chart--column-body">
                            <div className="chart__list-column">
                                <div className="chart__column">
                                    <div className="chart__column-index-bottom">2010</div>
                                </div>
                                <div className="chart__column">
                                    <div className="chart__column-index-bottom">2011</div>
                                </div>
                                <div className="chart__column">
                                    <div className="chart__column-index-bottom">2012</div>
                                </div>
                                <div className="chart__column">
                                    <div className="chart__column-index-bottom">2013</div>
                                </div>
                                <div className="chart__column">
                                    <div className="chart__column-index-bottom">2014</div>
                                </div>
                                <div className="chart__column">
                                    <div className="chart__column-index-bottom">2015</div>
                                </div>
                                <div className="chart__column">
                                    <div className="chart__column-index-bottom">2016</div>
                                </div>
                                <div className="chart__column">
                                    <div className="chart__column-index-bottom">2017</div>
                                </div>
                                <div className="chart__column">
                                    <div className="chart__column-index-bottom">2018</div>
                                </div>
                                <div className="chart__column">
                                    <div className="chart__column-index-bottom">2019</div>
                                </div>
                                <div className="chart__column">
                                    <div className="chart__column-index-bottom">2020</div>
                                </div>
                                <div className="chart__column">
                                    <div className="chart__column-index-bottom">2021</div>
                                </div>
                            </div>
                        </div>

                        <div className="chart__list-index-left">
                            <div className="chart__column-index-left">2000</div>
                            <div className="chart__column-index-left">1800</div>
                            <div className="chart__column-index-left">1600</div>
                            <div className="chart__column-index-left">1400</div>
                            <div className="chart__column-index-left">1200</div>
                            <div className="chart__column-index-left">1000</div>
                            <div className="chart__column-index-left">800</div>
                            <div className="chart__column-index-left">600</div>
                            <div className="chart__column-index-left">400</div>
                            <div className="chart__column-index-left">200</div>
                            <div className="chart__column-index-left">0</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
