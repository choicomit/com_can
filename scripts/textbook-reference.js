/* Display page numbers only. Match the main topic, not distractor options. */
(function(){
  const compact = value => String(value || '').normalize('NFC').toLowerCase().replace(/[\s\u200B-\u200D\uFEFF]/g, '');
  const rules = [
    {pages:[2], re:/용량단위|기억용량|1(?:kb|mb|gb|tb|pb|eb)|기가바이트|테라바이트/},
    {pages:[3], re:/처리속도.*단위|속도단위|자료.*표현단위|데이터.*논리적구성단위|한번의연산.*데이터.*단위/},
    {pages:[4], re:/유니코드|unicode|ascii|ebcdic|bcd코드|해밍코드|hamming/},
    {pages:[5], re:/아날로그컴퓨터|디지털컴퓨터/},
    {pages:[6,27], re:/전자우편.*프로토콜|smtp|pop3|imap|mime|파일전송프로토콜|원격파일전송/},
    {pages:[7], re:/정보통신망.*(?:범위|종류)|lan.*man.*wan/},
    {pages:[8], re:/라우터|리피터|브리지|게이트웨이|스위칭허브/},
    {pages:[9], re:/ipconfig|ping|tracert|nslookup/},
    {pages:[10], re:/스니핑|스푸핑|ddos|분산서비스거부|트로이목마|키로거|피기배킹/},
    {pages:[11], re:/가로채기|가로막기|데이터보안침해|위조\(fabrication\)/},
    {pages:[12], re:/공개키|비밀키|대칭키|비대칭키|암호화기법/},
    {pages:[13], re:/패치프로그램|셰어웨어|쉐어웨어|shareware|프리웨어|freeware|번들프로그램|트라이얼|데모버전/},
    {pages:[14], re:/디스크정리|디스크검사|조각모음|드라이브최적화/},
    {pages:[15], re:/언어번역|컴파일러|인터프리터|어셈블러/},
    {pages:[16], re:/레지스터|누산기|프로그램카운터|연산장치|산술논리연산/},
    {pages:[17], re:/펌웨어|firmware|eprom|eeprom|sram|dram|내부기억장치/},
    {pages:[18], re:/휴지통|바로가기아이콘/},
    {pages:[19], re:/가상기억|가상메모리|캐시메모리|플래시메모리|플래쉬메모리|연관메모리/},
    {pages:[20], re:/에어로피크|에어로스냅|에어로쉐이크|핫스왑|hot.?swap|플러그앤플레이|운영체제의목적/},
    {pages:[21], re:/윈도우키|windows키/},
    {pages:[22], re:/alt.*(?:tab|f4|enter)|shift.*delete/},
    {pages:[23,27], re:/인트라넷|엑스트라넷/},
    {pages:[23], re:/듀얼시스템|듀플렉스시스템|임베디드|옵트인/},
    {pages:[24], re:/멀티미디어의특징|하이퍼미디어|비트맵|벡터|렌더링|모핑|디더링|앨리어싱|엘리어싱|가상현실|증강현실|혼합현실|hdmi|스트리밍|vod/},
    {pages:[25], re:/미디|midi|사운드파일|오디오파일|시퀀싱|sequencing|샘플링|sampling|pcm|wave/},
    {pages:[26], re:/mpeg|표준동영상|동영상파일|avi|mov|divx/},
    {pages:[27], re:/rfid|전자태그|블루투스|bluetooth|iot|사물인터넷|유비쿼터스|lpwa|lbs|gps|블록체인|핀테크|메타버스|포털사이트|워터마크|url|p2p|테더링|와이브로/},
    {pages:[28], re:/ipv4|ipv6/}
  ];
  window.getTextbookReference = function(q){
    if(!q || q.subject !== '컴퓨터 일반') return null;
    const reviewed = window.TEXTBOOK_REFERENCES?.reviewed?.[q.id];
    if(reviewed) return reviewed;
    // Future additions get a conservative suggestion and remain explicitly pending review.
    const main = compact(q.desc);
    const found = rules.filter(rule=>rule.re.test(main));
    const pages = [...new Set(found.flatMap(rule=>rule.pages))].sort((a,b)=>a-b);
    return {pages,status:'pending'};
  };
  window.appendTextbookReference = function(container,q){
    const ref = window.getTextbookReference(q);
    if(!ref || ref.status !== 'matched' || !ref.pages.length) return;
    const box = document.createElement('div');
    box.className = 'textbook-reference';
    box.textContent = `교재 PDF ${ref.pages.join('·')}쪽`;
    container.appendChild(box);
  };
})();
