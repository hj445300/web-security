function openNewPage() {
    const newPageContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>创建阵营</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: "Microsoft YaHei", sans-serif;
            background: #ecf0f1;
            padding: 20px;
        }

        h1 {
            text-align: center;
            margin-bottom: 30px;
            color: #34495e;
        }

        .container {
            display: flex;
            justify-content: center;
            align-items: flex-start;
        }

        .list-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: calc(30% - 20px);
            margin: 10px;
        }

        .list-container {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            padding: 20px;
            width: 100%;
            height: 300px;
            overflow-y: auto;
        }

        .list-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            color: #2980b9;
        }

        ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        li {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            cursor: pointer;
        }

        li:last-child {
            border-bottom: none;
        }

        li.selected {
            background-color: #f0f0f0;
        }

        .blue-army {
            color: #3498db;
        }

        .country-info {
            color: #27ae60;
        }

        .red-army {
            color: #e74c3c;
        }

        .button-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 10px;
            height: 300px; /* Set a height to occupy the same space as the lists */
        }

        button {
            padding: 8px 15px;
            border: none;
            border-radius: 5px;
            background-color: #3498db;
            color: white;
            cursor: pointer;
            margin: 5px 0;
            width: 100px;
        }

        button:hover {
            background-color: #2980b9;
        }

        .flag {
            width: 20px;
            height: 15px;
            margin-right: 5px;
            display: inline-block;
            vertical-align: middle;
            background-size: cover;
        }

        .flag.country-a {
            background-image: url('https://flagcdn.com/w20/us.png'); /* Replace with actual flag URL */
        }

         .flag.country-b {
            background-image: url('https://flagcdn.com/w20/ca.png'); /* Replace with actual flag URL */
        }

         .flag.country-c {
            background-image: url('https://flagcdn.com/w20/gb.png'); /* Replace with actual flag URL */
        }

    </style>
</head>
<body>
    <h1>创建阵营</h1>

    <div class="container">
        <div class="list-wrapper">
            <div class="list-container">
                <h2 class="list-title">蓝军阵营</h2>
                <ul id="blueArmyList">
                    <!-- 蓝军单位将动态添加到这里 -->
                </ul>
            </div>
            <button onclick="clearBlueArmy()">清空阵营</button>
        </div>

        <div class="button-container">
            <button onclick="addBlueCountry()">←</button>
            <button onclick="removeBlueCountry()">→</button>
        </div>

        <div class="list-wrapper">
            <div class="list-container">
                <h2 class="list-title">国家信息列表</h2>
                <ul id="countryInfoList">
                    <li class="country-info" onclick="selectCountry(this)"><span class="flag country-a"></span>国家 A - 首都 X</li>
                    <li class="country-info" onclick="selectCountry(this)"><span class="flag country-b"></span>国家 B - 首都 Y</li>
                    <li class="country-info" onclick="selectCountry(this)"><span class="flag country-c"></span>国家 C - 首都 Z</li>
                </ul>
            </div>
        </div>

          <div class="button-container">
            <button onclick="addRedCountry()">→</button>
            <button onclick="removeRedCountry()">←</button>
        </div>

        <div class="list-wrapper">
            <div class="list-container">
                <h2 class="list-title">红军阵营</h2>
                <ul id="redArmyList">
                    <!-- 红军单位将动态添加到这里 -->
                </ul>
            </div>
             <button onclick="clearRedArmy()">清空阵营</button>
        </div>
    </div>

    <script>
        let selectedCountry = null;
        let selectedBlueArmy = null;
        let selectedRedArmy = null;

        const blueArmyList = document.getElementById('blueArmyList');
        const countryInfoList = document.getElementById('countryInfoList');
        const redArmyList = document.getElementById('redArmyList');

        // Store the original list of countries
        const originalCountries = Array.from(countryInfoList.children).map(function(li) {
            return {
                element: li,
                text: li.textContent,
                flagClass: li.querySelector('.flag').className // Store the flag class
            };
        });

        function selectCountry(element) {
            if (selectedCountry) {
                selectedCountry.classList.remove('selected');
            }
            selectedCountry = element;
            selectedCountry.classList.add('selected');
        }

        function addBlueCountry() {
            addCountry('blue');
        }

        function removeBlueCountry() {
            removeCountry('blue');
        }

        function addRedCountry() {
            addCountry('red');
        }

        function removeRedCountry() {
            removeCountry('red');
        }

        function clearBlueArmy() {
            // Get all the list items from blue army and add them back to the country list
            const blueArmyLis = Array.from(blueArmyList.children);
            blueArmyLis.forEach(function(li) {
                const countryText = li.textContent;
                 // Determine the flag class based on the country name
                let flagClass = '';
                if (countryText.startsWith('国家 A')) {
                    flagClass = 'flag country-a';
                } else if (countryText.startsWith('国家 B')) {
                    flagClass = 'flag country-b';
                } else if (countryText.startsWith('国家 C')) {
                    flagClass = 'flag country-c';
                }

                const originalCountry = document.createElement('li');
                originalCountry.className = 'country-info';
                originalCountry.onclick = function() { selectCountry(this); };
                originalCountry.innerHTML = '<span class="' + flagClass + '"></span>' + countryText; // Add flag to cleared countries
                countryInfoList.appendChild(originalCountry);
            });

            blueArmyList.innerHTML = ''; // Clear all child elements
        }

        function clearRedArmy() {
            // Get all the list items from red army and add them back to the country list
            const redArmyLis = Array.from(redArmyList.children);
             redArmyLis.forEach(function(li) {
                const countryText = li.textContent;
                 // Determine the flag class based on the country name
                let flagClass = '';
                if (countryText.startsWith('国家 A')) {
                    flagClass = 'flag country-a';
                } else if (countryText.startsWith('国家 B')) {
                    flagClass = 'flag country-b';
                } else if (countryText.startsWith('国家 C')) {
                    flagClass = 'flag country-c';
                }

                const originalCountry = document.createElement('li');
                originalCountry.className = 'country-info';
                originalCountry.onclick = function() { selectCountry(this); };
                originalCountry.innerHTML = '<span class="' + flagClass + '"></span>' + countryText; // Add flag to cleared countries
                countryInfoList.appendChild(originalCountry);
            });

            redArmyList.innerHTML = ''; // Clear all child elements
        }


       function addCountry(army) {
            if (selectedCountry) {
                const countryText = selectedCountry.textContent;
                let flagClass = '';

                if (countryText.startsWith('国家 A')) {
                    flagClass = 'flag country-a';
                } else if (countryText.startsWith('国家 B')) {
                    flagClass = 'flag country-b';
                } else if (countryText.startsWith('国家 C')) {
                    flagClass = 'flag country-c';
                }

                const newLi = document.createElement('li');
                newLi.innerHTML = '<span class="' + flagClass + '"></span>' + countryText;


                if (army === 'blue') {
                    newLi.className = 'blue-army';
                    newLi.onclick = function() { selectBlueArmy(this); };
                    blueArmyList.appendChild(newLi);
                } else if (army === 'red') {
                    newLi.className = 'red-army';
                    newLi.onclick = function() { selectRedArmy(this); };
                    redArmyList.appendChild(newLi);
                }

                // Remove the country from the original list
                selectedCountry.remove();
                selectedCountry = null;

                //Deselect any selected army units
                selectedBlueArmy = null;
                selectedRedArmy = null;
            } else {
                alert('请选择要添加的国家');
            }
        }

        function removeCountry(army) {
            let selectedUnit = null;
            let selectedList = null;
            let armyClass = '';
            let flagClass = '';
            let countryText = '';

            if (army === 'blue') {
                selectedUnit = selectedBlueArmy;
                selectedList = blueArmyList;
                armyClass = 'blue-army';
            } else if (army === 'red') {
                selectedUnit = selectedRedArmy;
                selectedList = redArmyList;
                armyClass = 'red-army';
            }

            if (selectedUnit) {
                countryText = selectedUnit.textContent;

                  if (countryText.startsWith('国家 A')) {
                    flagClass = 'flag country-a';
                } else if (countryText.startsWith('国家 B')) {
                    flagClass = 'flag country-b';
                } else if (countryText.startsWith('国家 C')) {
                    flagClass = 'flag country-c';
                }
                selectedUnit.remove();

                 // Add the country back to the original list
                 const originalCountry = document.createElement('li');
                 originalCountry.className = 'country-info';
                 originalCountry.onclick = function() { selectCountry(this); };
                 originalCountry.innerHTML = '<span class="' + flagClass + '"></span>' + countryText;
                 countryInfoList.appendChild(originalCountry);

                if (army === 'blue') {
                    selectedBlueArmy = null;
                } else if (army === 'red') {
                    selectedRedArmy = null;
                }
            } else {
                alert(\`请选择要删除的\${army === 'blue' ? '蓝军' : '红军'}单位\`);
            }
        }

        function selectBlueArmy(element) {
            if (selectedBlueArmy) {
                selectedBlueArmy.classList.remove('selected');
            }
            selectedBlueArmy = element;
            selectedBlueArmy.classList.add('selected');
             if(selectedRedArmy){
                 selectedRedArmy.classList.remove('selected');
                 selectedRedArmy = null;
             }
        }

        function selectRedArmy(element) {
            if (selectedRedArmy) {
                selectedRedArmy.classList.remove('selected');
            }
            selectedRedArmy = element;
            selectedRedArmy.classList.add('selected');
            if(selectedBlueArmy){
                 selectedBlueArmy.classList.remove('selected');
                 selectedBlueArmy = null;
             }
        }
    </script>
</body>
</html>
    `;
    const newWindow = window.open();
    newWindow.document.write(newPageContent);
    newWindow.document.close();
}