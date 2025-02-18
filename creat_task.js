    document.addEventListener('DOMContentLoaded', function () {
      const menuItems = document.querySelectorAll('.menu-item');

      menuItems.forEach(function (menuItem) {
        const menuTitle = menuItem.querySelector('.menu-title');

        menuTitle.addEventListener('click', function () {
          menuItem.classList.toggle('active');
        });
      });  
	  

      // Add click event to the "Create Task" sub-menu button (icon)
      const createTaskSubBtnIcon = document.querySelector('.sub-menu li[title="创建任务"] i');
      if (createTaskSubBtnIcon) {
        createTaskSubBtnIcon.addEventListener('click', function () {
          window.location.href = 'create_task.html';
        });
      }

      // Function to initialize the weather settings panel
      function initializeWeatherSettingsPanel() {
        const detailedSettingsButton = document.getElementById("detailedSettingsButton");
        const detailedSettingsPanel = document.getElementById("detailedSettingsPanel");

        if (detailedSettingsButton) {
          detailedSettingsButton.addEventListener("click", function () {
            console.log("Detailed Settings button clicked!");
            detailedSettingsPanel.classList.toggle('visible');
            console.log("Detailed Settings panel classList:", detailedSettingsPanel.classList);
          });
        } else {
          console.error("Detailed settings button not found!");
        }

        const saveButton = document.getElementById('saveButton');
        const formElements = document.querySelectorAll('.weather-settings-panel select, .weather-settings-panel input[type="number"]');

        formElements.forEach(function (element) {
          element.addEventListener('change', function () {
            saveButton.classList.remove('active');
          });
        });

        saveButton.addEventListener('click', function () {
          saveButton.classList.add('active');
        });
      }

      // Weather Settings Panel Toggle
      const weatherSettingsBtn = document.querySelector('.sub-menu li[title="天气设置"]');
      const mainContent = document.querySelector('.main-content');

      //Function to hide all panels
      function hideAllPanels() {
        const weatherSettingsPanel = document.querySelector('.weather-settings-panel');
        const mapOptionsPanel = document.querySelector('.map-selection-panel');
        const planeGroupPanel = document.querySelector('.plane-group-panel');
		const helicopterGroupPanel = document.querySelector('.helicopter-group-panel');

        if (weatherSettingsPanel && weatherSettingsPanel.style.display === 'block') {
          weatherSettingsPanel.style.display = 'none';
        }

        if (mapOptionsPanel && mapOptionsPanel.style.display === 'block') {
          mapOptionsPanel.style.display = 'none';
        }

        if (planeGroupPanel && planeGroupPanel.style.display === 'block') {
          planeGroupPanel.style.display = 'none';
        }
		
		if (helicopterGroupPanel && helicopterGroupPanel.style.display === 'block') {
          helicopterGroupPanel.style.display = 'none';
        }
      }

      if (weatherSettingsBtn && mainContent) {
        weatherSettingsBtn.addEventListener('click', function () {
          let weatherSettingsPanel = document.querySelector('.weather-settings-panel'); // Get the panel

          if (weatherSettingsPanel && weatherSettingsPanel.style.display === 'block') {
            // If the weather settings panel is already visible, hide it and return
            weatherSettingsPanel.style.display = 'none';
            return;
          }

          // If any other panel is visible, hide it
          hideAllPanels();

          if (!weatherSettingsPanel) {
            // Panel doesn't exist, so fetch and create it
            fetch('weather_settings.html')
              .then(response => response.text())
              .then(data => {
                // Insert the weather settings panel into the main content
                mainContent.insertAdjacentHTML('beforeend', data);
                weatherSettingsPanel = document.querySelector('.weather-settings-panel');

                initializeWeatherSettingsPanel(); // Initialize any JavaScript for the weather settings panel
                weatherSettingsPanel.style.display = 'block'; // Show the panel
              })
              .catch(error => {
                console.error('Error fetching weather_settings.html:', error);
              });
          }
          else {
            // Panel exists, so show it
            weatherSettingsPanel.style.display = 'block';
          }
        });
      }

      // Function to initialize the map options panel
      function initializeMapOptionsPanel() {
        const regionSelect = document.getElementById('region');
        const regionDescriptionTextarea = document.getElementById('region_description');
        const confirmButton = document.getElementById('confirmButton');

        const regionDescriptions = {
          caucasus: "高加索地区位于欧亚大陆交界处，以其壮丽的山脉和多样的文化而闻名。",
          persian_gulf: "波斯湾地区是中东地区重要的石油产区，拥有丰富的自然资源。",
          other: "This is a description for another region."
        };

        regionSelect.addEventListener('change', function () {
          const selectedRegion = regionSelect.value;
          regionDescriptionTextarea.value = regionDescriptions[selectedRegion] || "暂无该区域的简介。";
          confirmButton.classList.remove('active');
        });

        confirmButton.addEventListener('click', function () {
          if (regionSelect.value) {
            confirmButton.classList.add('active');
          }
        });
      }

      // Map Selection Panel Toggle
      const mapOptionsBtn = document.querySelector('.sub-menu li[title="地图选项"]');
      const mapContainer = document.querySelector('.map-container');

      if (mapOptionsBtn && mainContent && mapContainer) {
        mapOptionsBtn.addEventListener('click', function () {
          let mapOptionsPanel = document.querySelector('.map-selection-panel');

          if (mapOptionsPanel && mapOptionsPanel.style.display === 'block') {
            // If the map options panel is already visible, hide it and return
            mapOptionsPanel.style.display = 'none';
            return;
          }

          // If any other panel is visible, hide it
          hideAllPanels();

          if (!mapOptionsPanel) {
            fetch('map_options.html')
              .then(response => response.text())
              .then(data => {
                // Insert the map options panel into the main content
                mainContent.insertAdjacentHTML('beforeend', data);
                mapOptionsPanel = document.querySelector('.map-selection-panel');
                initializeMapOptionsPanel(); // Initialize any JavaScript for the map options panel
                mapOptionsPanel.style.display = 'block';
              })
              .catch(error => {
                console.error('Error fetching map_options.html:', error);
              });
          }
          else {
            mapOptionsPanel.style.display = 'block';
          }
        });

        // Remove the click listener from the map container
        mapContainer.removeEventListener('click', function () {
          if (document.querySelector('.map-selection-panel') && document.querySelector('.map-selection-panel').style.display === 'block') {
            document.querySelector('.map-selection-panel').style.display = 'none';
          }
        });
      }

      // Function to initialize the plane group panel
      function attachPlaneGroupPanel(planeGroupPanel) {
	  
        const addPlaneButton = planeGroupPanel.querySelector('#addPlaneButton');
        const planeList = planeGroupPanel.querySelector('#planeList');
        const tabs = planeGroupPanel.querySelectorAll('.tab');
        const tabContents = planeGroupPanel.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
          tab.addEventListener('click', function () {
            const target = this.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));

            this.classList.add('active');
            planeGroupPanel.querySelector('#' + target).classList.add('active');
          });
        });
		
		//
		//处理是否隐藏无线电频率输入框
		const radioEnabledSelect = document.getElementById('radioEnabled');
		const radioFrequencyInput = document.getElementById('radioFrequency');
		radioFrequencyInput.disabled = true;
		//
		
		//处理添加 编辑 删除按钮
		const waypointNameInput = document.getElementById('waypointName');
		const waypointLatInput = document.getElementById('waypointLat');
		const waypointLonInput = document.getElementById('waypointLon');
		const waypointAltInput = document.getElementById('waypointAlt');

		const addWaypointButton = document.getElementById('addWaypointButton');
		const editWaypointButton = document.getElementById('editWaypointButton');
		const deleteWaypointButton = document.getElementById('deleteWaypointButton');
		const waypointList = document.getElementById('waypointList');

		function clearWaypointFields() {
		  waypointNameInput.value = '';
		  waypointLatInput.value = '';
		  waypointLonInput.value = '';
		  waypointAltInput.value = '';
		}

		function disableWaypointFields() {
		  waypointNameInput.disabled = true;
		  waypointLatInput.disabled = true;
		  waypointLonInput.disabled = true;
		}

		function enableWaypointFields() {
		  waypointNameInput.disabled = false;
		  waypointLatInput.disabled = false;
		  waypointLonInput.disabled = false;
		  waypointAltInput.disabled = false;
		}

		addWaypointButton.addEventListener('click', function () {
		  clearWaypointFields();
		  disableWaypointFields();
		  waypointAltInput.disabled = false;

		  const waypointName = waypointNameInput.value.trim();
		  const waypointLat = waypointLatInput.value.trim();
		  const waypointLon = waypointLonInput.value.trim();
		  const waypointAlt = waypointAltInput.value.trim();

		  if (waypointName && waypointLat && waypointLon && waypointAlt) {
			const listItem = document.createElement('li');
			listItem.textContent = `${waypointName} (${waypointLat}, ${waypointLon}, ${waypointAlt})`;
			waypointList.appendChild(listItem);
		  }
		});

		editWaypointButton.addEventListener('click', function () {
		  enableWaypointFields();
		  //TODO: Add logic to select a waypoint from the map and populate the fields
		});

		deleteWaypointButton.addEventListener('click', function () {
		  //TODO: Add logic to delete the selected waypoint from the list and clear the fields
		  clearWaypointFields();
		});
	
		//其他处理
        addPlaneButton.addEventListener('click', function () {
          const planeNameInput = planeGroupPanel.querySelector('#groupName');
          const planeName = planeNameInput.value.trim();

          if (planeName) {
            const listItem = document.createElement('li');
            listItem.textContent = planeName;
            planeList.appendChild(listItem);
            planeNameInput.value = '';
          }
        });		
		
        const addLoadoutButton = planeGroupPanel.querySelector('#addLoadoutButton');
        const loadoutList = planeGroupPanel.querySelector('#loadoutList');

        addLoadoutButton.addEventListener('click', function () {
          const loadoutNameInput = planeGroupPanel.querySelector('#loadoutName');
          const loadoutName = loadoutNameInput.value.trim();

          if (loadoutName) {
            const listItem = document.createElement('li');
            listItem.textContent = loadoutName;
            loadoutList.appendChild(listItem);
            loadoutNameInput.value = '';
          }
        });
      }

      function updatePlaneTypes(planeGroupPanel) {
        const factionSelect = planeGroupPanel.querySelector('#faction');
        const planeTypeSelect = planeGroupPanel.querySelector('#planeType');
        const selectedFaction = factionSelect.value;

        // Clear existing options
        planeTypeSelect.innerHTML = '';

        let planeTypes = [];
        if (selectedFaction === 'red') {
          planeTypes = [
            "J-10C",
            "J-11A",
            "J-16",
            "JH-7A",
            "H-6J",
            "KJ-2000",
            "Y-8G",
            "Y-8X",
            "Z-10",
            "WZ-10",
            "WZ-19"
          ];
        } else if (selectedFaction === 'blue') {
          planeTypes = [
            "F-14A",
            "F-15C",
            "F-16C",
            "F/A-18C",
            "AV-8B",
            "A-10A",
            "EA-18G",
            "E-3A",
            "KC-135",
            "S-3B",
            "SH-60B",
            "AH-64D",
            "UH-1H",
            "UH-60L",
            "Mi-24P",
            "Mi-8MT",
            "Ka-50",
            "A-50",
            "Su-25",
            "Su-33"
          ];
        }

        // Add new options
        for (let i = 0; i < planeTypes.length; i++) {
          const option = document.createElement('option');
          option.value = planeTypes[i];
          option.textContent = planeTypes[i];
          planeTypeSelect.appendChild(option);
        }
      }

	  // 添加使能函数 检测是否OK
      function enableDisableRadioFrequency(planeGroupPanel) {
        const radioEnabledSelect = planeGroupPanel.querySelector('#radioEnabled');
        const radioFrequencyInput = planeGroupPanel.querySelector('#radioFrequency');

        if (radioEnabledSelect && radioFrequencyInput) {
          radioEnabledSelect.addEventListener('change', function () {
            const isEnabled = radioEnabledSelect.value === 'yes';
            radioFrequencyInput.disabled = !isEnabled;
          });
          // Initialize the state on load
          radioFrequencyInput.disabled = radioEnabledSelect.value !== 'yes';
        }
      }
	  
      // Plane Group Panel Toggle
      const planeBtn = document.querySelector('.sub-menu li[title="飞机"]');

      if (planeBtn && mainContent) {
        planeBtn.addEventListener('click', function () {
          let planeGroupPanel = document.querySelector('.plane-group-panel');

          if (planeGroupPanel && planeGroupPanel.style.display === 'block') {
            // If the plane group panel is already visible, hide it and return
            planeGroupPanel.style.display = 'none';
            return;
          }

          // If any other panel is visible, hideAllPanels();
          hideAllPanels();

          if (!planeGroupPanel) {
            fetch('plane_group.html')
              .then(response => response.text())
              .then(data => {
                // Insert the plane group panel into the main content
                mainContent.insertAdjacentHTML('beforeend', data);
                planeGroupPanel = document.querySelector('.plane-group-panel');
                attachPlaneGroupPanel(planeGroupPanel); // Call the function to attach event listeners
                updatePlaneTypes(planeGroupPanel);
				enableDisableRadioFrequency(planeGroupPanel);
                planeGroupPanel.querySelector('#faction').addEventListener('change', () => updatePlaneTypes(planeGroupPanel)); // Attach event listener to faction
                planeGroupPanel.style.display = 'block';
              })
              .catch(error => {
                console.error('Error fetching plane_group.html:', error);
              });
          }
          else {
            planeGroupPanel.style.display = 'block';
          }
        });
      }
	  
	  // 直升机的处理
      function attachHelicopterGroupPanel(helicopterGroupPanel) {
	  
        const addHelicopterButton = helicopterGroupPanel.querySelector('#addPlaneButton');
        const planeList = helicopterGroupPanel.querySelector('#planeList');
        const tabs = helicopterGroupPanel.querySelectorAll('.tab');
        const tabContents = helicopterGroupPanel.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
          tab.addEventListener('click', function () {
            const target = this.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));

            this.classList.add('active');
            planeGroupPanel.querySelector('#' + target).classList.add('active');
          });
        });
		
		//
		//处理是否隐藏无线电频率输入框
		const radioEnabledSelect = document.getElementById('radioEn');
		const radioFrequencyInput = document.getElementById('radioFreq');
		radioFrequencyInput.disabled = true;
		//
		
		//处理添加 编辑 删除按钮
		const waypointNameInput = document.getElementById('wpName');
		const waypointLatInput = document.getElementById('wpLat');
		const waypointLonInput = document.getElementById('wpLon');
		const waypointAltInput = document.getElementById('wpAlt');

		const addwpButton = document.getElementById('addwpButton');
		const editwpButton = document.getElementById('editwpButton');
		const deletewpButton = document.getElementById('deletewpButton');
		const wpList = document.getElementById('wpList');

		function clearwpFields() {
		  waypointNameInput.value = '';
		  waypointLatInput.value = '';
		  waypointLonInput.value = '';
		  waypointAltInput.value = '';
		}

		function disablewpFields() {
		  waypointNameInput.disabled = true;
		  waypointLatInput.disabled = true;
		  waypointLonInput.disabled = true;
		}

		function enablewpFields() {
		  waypointNameInput.disabled = false;
		  waypointLatInput.disabled = false;
		  waypointLonInput.disabled = false;
		  waypointAltInput.disabled = false;
		}

		addwpButton.addEventListener('click', function () {
		  clearwpFields();
		  disablewpFields();
		  waypointAltInput.disabled = false;

		  const waypointName = waypointNameInput.value.trim();
		  const waypointLat = waypointLatInput.value.trim();
		  const waypointLon = waypointLonInput.value.trim();
		  const waypointAlt = waypointAltInput.value.trim();

		  if (waypointName && waypointLat && waypointLon && waypointAlt) {
			const listItem = document.createElement('li');
			listItem.textContent = `${waypointName} (${waypointLat}, ${waypointLon}, ${waypointAlt})`;
			waypointList.appendChild(listItem);
		  }
		});

		editwpButton.addEventListener('click', function () {
		  enablewpFields();
		  //TODO: Add logic to select a waypoint from the map and populate the fields
		});

		deletewpButton.addEventListener('click', function () {
		  //TODO: Add logic to delete the selected waypoint from the list and clear the fields
		  clearwpFields();
		});
	
		//其他处理
        addHelicopterButton.addEventListener('click', function () {
          const planeNameInput = helicopterGroupPanel.querySelector('#groupName');
          const planeName = planeNameInput.value.trim();

          if (planeName) {
            const listItem = document.createElement('li');
            listItem.textContent = planeName;
            planeList.appendChild(listItem);
            planeNameInput.value = '';
          }
        });		
		
        const addLoadoutButton = helicopterGroupPanel.querySelector('#addLoadoutButton');
        const loadoutList = helicopterGroupPanel.querySelector('#loadoutList');

        addLoadoutButton.addEventListener('click', function () {
          const loadoutNameInput = helicopterGroupPanel.querySelector('#loadoutName');
          const loadoutName = loadoutNameInput.value.trim();

          if (loadoutName) {
            const listItem = document.createElement('li');
            listItem.textContent = loadoutName;
            loadoutList.appendChild(listItem);
            loadoutNameInput.value = '';
          }
        });
      }

      function updateHelicopterTypes(helicopterGroupPanel) {
        const factionSelect = helicopterGroupPanel.querySelector('#faction');
        const planeTypeSelect = helicopterGroupPanel.querySelector('#planeType');
        const selectedFaction = factionSelect.value;

        // Clear existing options
        planeTypeSelect.innerHTML = '';

        let planeTypes = [];
        if (selectedFaction === 'red') {
          planeTypes = [            
            "Z-10",
            "WZ-10",
            "WZ-19"
          ];
        } else if (selectedFaction === 'blue') {
          planeTypes = [            
            "SH-60B",
            "AH-64D",
            "UH-1H",
            "UH-60L",            
            "Ka-50"
          ];
        }

        // Add new options
        for (let i = 0; i < planeTypes.length; i++) {
          const option = document.createElement('option');
          option.value = planeTypes[i];
          option.textContent = planeTypes[i];
          planeTypeSelect.appendChild(option);
        }
      }

	  // 添加使能函数 检测是否OK
      function enDisableRadioFrequency(helicopterGroupPanel) {
        const radioEnabledSelect = helicopterGroupPanel.querySelector('#radioEn');
        const radioFrequencyInput = helicopterGroupPanel.querySelector('#radioFreq');

        if (radioEnabledSelect && radioFrequencyInput) {
          radioEnabledSelect.addEventListener('change', function () {
            const isEnabled = radioEnabledSelect.value === 'yes';
            radioFrequencyInput.disabled = !isEnabled;
          });
          // Initialize the state on load
          radioFrequencyInput.disabled = radioEnabledSelect.value !== 'yes';
        }
      }
	  
      // Plane Group Panel Toggle
      const helicopterBtn = document.querySelector('.sub-menu li[title="直升机"]');

      if (helicopterBtn && mainContent) {
        helicopterBtn.addEventListener('click', function () {
          let helicopterGroupPanel = document.querySelector('.helicopter-group-panel');

          if (helicopterGroupPanel && helicopterGroupPanel.style.display === 'block') {
            // If the plane group panel is already visible, hide it and return
            helicopterGroupPanel.style.display = 'none';
            return;
          }

          // If any other panel is visible, hideAllPanels();
          hideAllPanels();

          if (!helicopterGroupPanel) {
            fetch('helicopter_group.html')
              .then(response => response.text())
              .then(data => {
                // Insert the plane group panel into the main content
                mainContent.insertAdjacentHTML('beforeend', data);
                helicopterGroupPanel = document.querySelector('.helicopter-group-panel');
                attachHelicopterGroupPanel(helicopterGroupPanel); // Call the function to attach event listeners
                updateHelicopterTypes(helicopterGroupPanel);
				enDisableRadioFrequency(helicopterGroupPanel);
                helicopterGroupPanel.querySelector('#faction').addEventListener('change', () => updateHelicopterTypes(helicopterGroupPanel)); // Attach event listener to faction
                helicopterGroupPanel.style.display = 'block';
              })
              .catch(error => {
                console.error('Error fetching plane_group.html:', error);
              });
          }
          else {
            helicopterGroupPanel.style.display = 'block';
          }
        });
      }
    });