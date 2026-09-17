(function(){
  "use strict";

  /* ================================================================
     CASE FILE — Portfolio Template
     script.js

     HOW THIS FILE IS ORGANISED
     ---------------------------------------------------------------
     1.  CASES              → ✏️ YOUR PROJECTS. Edit this array to
                               add your own work, images, and links.
     2.  BOOT SEQUENCE       → drives the opening loading animation.
     3.  HERO POINTER FX     → cursor-tracking scanline/spotlight.
     4.  build cards / list  → turns CASES into on-screen elements.
     5.  view toggle         → slider ⇄ list switch.
     6.  fillDossier()       → fills the fullscreen detail panel.
     7.  open / step / close → the dossier's open/close animation
                               and state machine.

     You will only ever need section 1 to add your own content.
     Everything after that is behaviour and should be left alone
     unless you're comfortable editing JavaScript.
     ================================================================ */

  /* ================================================================
     ✏️✏️✏️  EDIT ME — YOUR PROJECTS
     ================================================================
     One object per project. Copy an existing block, paste it as a
     new entry in the array, and change the values. Fields:

       glyph    "01","02"... — the 2-digit file number shown on the
                card, list row, and dossier. Keep them sequential.
       tag      short category shown in red vertical text on the
                card and as a chip in list view (e.g. "3D Experience")
       title    the project's name — shown big, everywhere
       sub      one-sentence description under the title in the
                dossier header
       year / context / client / duration
                not shown anywhere right now (the METADATA sidebar
                that used to display these was replaced by the
                "IN THIS FILE" section outline). Left in the data in
                case you want to surface them again later — safe to
                ignore, or delete from an entry if you'd rather.
       tags     array of short keyword chips (design/domain tags)
       stack    array of short keyword chips (tools/technologies)

       image    ✏️ PUT YOUR COVER PHOTO HERE.
                A URL or relative path, e.g. "images/alpha-cover.jpg".
                Used as the card thumbnail, the list-row background,
                AND the dossier header image — one photo, three
                places. Leave it as "" (empty string) to fall back
                to a gradient (uses pc1/pc2 below) with a line-art
                icon over it, picked automatically from "tag" via
                the ICONS map above. Add a tag there to give a new
                category its own icon; unmapped tags get a plain
                document glyph.

       url      ✏️ PUT YOUR LIVE PROJECT LINK HERE.
                e.g. "https://your-project.com". This becomes the
                dossier's "ACCESS SITE" button. Leave it "" (empty)
                and the button automatically shows as disabled
                ("NO PUBLIC URL") instead of linking nowhere.

       pc1/pc2  two hex colours used to build the fallback gradient
                when "image" is empty. Not used at all once you add
                a real image — safe to ignore if every project has
                a photo.

       sections array of write-ups shown in the dossier body, each:
                  label  short red caps heading, e.g. "MISSION_REPORT"
                  text   a paragraph of body copy
                  shot   true/false — whether to show an image block
                         under this paragraph
                  image  ✏️ optional per-section photo (a screenshot,
                         detail shot, etc). Same rule as the cover
                         image: leave "" to use a gradient instead.
                  sc1/sc2 fallback gradient colours for this section's
                         shot when "image" is empty (ignored once you
                         add a real image)

     HOW MANY PROJECTS CAN I HAVE?
     Any number — add or delete entries freely. The file counter in
     the footer and the boot-log line update automatically from
     CASES.length; you don't need to touch those anywhere.
     ================================================================ */
  const CASES = [
    { glyph:"01", tag:"Hardware", title:"Computer Organization & Architecture", sub:"Full teardown, clean and CPU repaste on a desktop tower, plus the hardware/networking toolkit that goes with it.",
      year:"2024", context:"Academic", client:"LV6A Coursework", duration:"2 practicals", pc1:"#3a3226", pc2:"#14100b",
      image:"", url:"",
      tags:["Hardware","Networking"], stack:["Desktop Hardware","LAN Tools"],
      sections:[
        {label:"TEARDOWN_AND_CLEAN", text:"A full teardown and clean of a desktop tower — pulling the PSU, RAM and drives to clear out built-up dust, then reseating every power and data connection on the way back together.", shot:true, image:"images/1/coa_hands_on.webp"},
        {label:"CPU_REPASTE", text:"Removing the CPU cooler to strip off the old, dried thermal paste and reapply a fresh layer before reseating the heatsink — the part of the teardown that actually affects thermals, not just dust.", shot:true, image:""},
        {label:"HARDWARE_TOOLKIT", text:"A complete hardware and networking toolkit — LAN cable tester, crimping and punch-down tools, soldering iron and screwdrivers — kept on hand for cable termination, network testing, and case- or board-level repair work.", shot:true, image:"images/1/coa_toolbox.webp"}
      ] },
    { glyph:"02", tag:"OS", title:"Operating Systems", sub:"A clean Windows 10 install on lab machines, then managing disks, partitions and live performance inside Windows 11.",
      year:"2024", context:"Academic", client:"LV6A Coursework", duration:"3 practicals", pc1:"#26323a", pc2:"#0b1114",
      image:"", url:"",
      tags:["Operating Systems","Sysadmin"], stack:["Windows 10","Windows 11","Disk Management","Task Manager"],
      sections:[
        {label:"CLEAN_INSTALL", text:"A group lab exercise installing Windows 10 from scratch on lab desktops — booting from a USB installer, wiping the existing partitions, and running the install through to a working desktop.", shot:true, image:"images/2/os_clean_install.jpg"},
        {label:"DISK_MANAGEMENT", text:"Managing disks and NTFS partitions in Windows 11 Disk Management, including a removable Kingston USB drive.", shot:true, image:"images/2/os_disk_mgmt.webp"},
        {label:"TASK_MANAGER_PERFORMANCE", text:"Monitoring CPU, memory, disk, network and GPU performance in Windows 11 Task Manager on a high-end i9 / RTX 3080 Ti machine.", shot:true, image:"images/2/os_task_mgr.webp"}
      ] },
    { glyph:"03", tag:"Programming", title:"Fundamentals in Programming", sub:"Seven Java programs covering environment setup, data operations, control structures, method overloading, recursion and OOP.",
      year:"2024", context:"Academic", client:"LV6A Coursework", duration:"7 labs", pc1:"#2c3a2c", pc2:"#0d140d",
      image:"", url:"",
      tags:["OOP","Algorithms"], stack:["Java"],
      sections:[
        {label:"ENVIRONMENT_SETUP", text:"Confirming the JDK is installed and configured correctly by printing the runtime's own version, vendor and OS details straight from System.getProperty(), alongside a Hello World.", shot:true, image:"images/3/env_check.png"},
        {label:"UNIT_CONVERTER", text:"A metric/imperial unit converter exercising int, double, char and boolean — temperature, distance, weight and volume all converted and printed from one set of sample readings.", shot:true, image:"images/3/unit_converter.png"},
        {label:"GRADE_REPORT", text:"A student grade report looping over an array of scores, classifying each with a switch statement and an if/else pass-fail check, then a while loop with break to find the first distinction.", shot:true, image:"images/3/grade.png"},
        {label:"FIBONACCI_METHODS", text:"The same Fibonacci calculation written two ways — a recursive method and an iterative one — called back to back and timed with System.nanoTime() to show the performance gap directly.", shot:true, image:"images/3/fibonacci.png"},
        {label:"OVERLOADED_AREA", text:"An area() method overloaded four times for a square, rectangle, triangle and circle, showing Java choosing the right version to run based on the arguments passed in.", shot:true, image:"images/3/shape.png"},
        {label:"LIBRARY_CATALOG", text:"An abstract LibraryItem class with Book and DVD subclasses — inheritance, encapsulation and polymorphism, with each item printing its own describe() when looped over as one array.", shot:true, image:"images/3/library.png"},
        {label:"PALINDROME_ANAGRAM", text:"A batch palindrome and anagram checker — comparing characters from both ends of a string, and comparing sorted character arrays, across a set of test cases.", shot:true, image:"images/3/pali.png"}
      ] },
    { glyph:"04", tag:"AI", title:"Artificial Intelligence", sub:"Classic AI and ML built from scratch in Python — classifiers, evaluation metrics and a genetic algorithm.",
      year:"2025", context:"Academic", client:"LV6A Coursework", duration:"7 labs", pc1:"#2c2f3a", pc2:"#0c0d14",
      image:"", url:"",
      tags:["Machine Learning","From Scratch"], stack:["Python","NumPy"],
      sections:[
        {label:"AI_CONTROL_STRUCTURES", text:"Simulating an early-stopping mechanism for neural-network training in Python with a patience counter.", shot:true, image:"images/4/ai_control.webp"},
        {label:"AI_DATA_TYPES", text:"Building an AI knowledge graph in Python with nested dictionaries of entities and relations, then traversing the edges.", shot:true, image:"images/4/ai_data_types.webp"},
        {label:"AI_FUNCTIONS", text:"Writing AI evaluation-metric functions in Python — Mean Squared Error loss and a ReLU activation.", shot:true, image:"images/4/ai_functions.webp"},
        {label:"KNN_CLASSIFIER", text:"Classifying iris flower species with a K-Nearest Neighbors classifier built from scratch in Python.", shot:true, image:"images/4/ai_knn.webp"},
        {label:"NAIVE_BAYES", text:"Implementing a Naive Bayes sentiment-analysis classifier from scratch in Python with Laplace smoothing.", shot:true, image:"images/4/ai_naive_bayes.webp"},
        {label:"AI_OOP", text:"Modelling a genetic-algorithm chromosome as a Python class with fitness scoring and mutation.", shot:true, image:"images/4/ai_oop.webp"},
        {label:"SCIENTIFIC_MODULES", text:"Building an AI data-standardization pipeline in Python — mean, standard deviation and Z-score normalization from scratch.", shot:true, image:"images/4/ai_scientific.webp"}
      ] },
    { glyph:"05", tag:"Algorithms", title:"Algorithms & Data Structures", sub:"Core data structures and algorithms in C# — trees, linked lists, recursion, search and graph traversal.",
      year:"2025", context:"Academic", client:"LV6A Coursework", duration:"7 labs", pc1:"#3a2c2c", pc2:"#140d0d",
      image:"", url:"",
      tags:["Data Structures","Algorithms"], stack:["C#"],
      sections:[
        {label:"ARRAY_OPERATIONS", text:"Transposing a 3x4 matrix into a 4x3 matrix in C# with nested loops.", shot:true, image:"images/5/ads_array.webp"},
        {label:"BINARY_TREE_SEARCH", text:"Traversing a binary tree in C# with pre-order, in-order and post-order depth-first traversals.", shot:true, image:"images/5/ads_binary_tree.webp"},
        {label:"LINKED_LISTS", text:"Finding the middle node of a linked list in C# with the Tortoise-and-Hare fast/slow pointer technique.", shot:true, image:"images/5/ads_linked_list.webp"},
        {label:"RECURSION", text:"Solving the Tower of Hanoi recursively in C#, printing each optimal disk move.", shot:true, image:"images/5/ads_recursion.webp"},
        {label:"SEARCHING_AND_SORTING", text:"Implementing a logarithmic-time binary search in C# over a sorted data stream.", shot:true, image:"images/5/ads_search_sort.webp"},
        {label:"SHORTEST_PATH", text:"Finding the shortest path in an unweighted graph in C# using breadth-first search with a parent map.", shot:true, image:"images/5/ads_shortest_path.webp"},
        {label:"STACKS_AND_QUEUES", text:"Reversing a string in C# by pushing characters onto a Stack and popping them off (LIFO).", shot:true, image:"images/5/ads_stacks_queues.webp"}
      ] },
    { glyph:"06", tag:"Databases", title:"Database Management", sub:"Relational database design and SQL — schemas, constraints, joins, views and triggers in SQL Server.",
      year:"2025", context:"Academic", client:"LV6A Coursework", duration:"7 labs", pc1:"#3a3626", pc2:"#14120b",
      image:"", url:"",
      tags:["SQL","Database Design"], stack:["SQL Server","T-SQL"],
      sections:[
        {label:"CREATE_TABLE", text:"Building a university schema in SQL Server — Students, Courses and Enrollments tables with identity and foreign keys, then inserting records.", shot:true, image:"images/6/db_create_table.webp"},
        {label:"ALTER_TABLE", text:"Altering a Users table to add last-login and active-status columns, then updating specific rows.", shot:true, image:"images/6/db_alter_table.webp"},
        {label:"DATA_MANIPULATION", text:"Running INSERT, UPDATE and DELETE on an inventory table — discounting high-stock items and purging out-of-stock ones.", shot:true, image:"images/6/db_dml.webp"},
        {label:"DROP_TABLE", text:"Dropping a temporary system-backup-logs table in SQL Server after a log rotation.", shot:true, image:"images/6/db_drop_table.webp"},
        {label:"JOINS", text:"Joining Appointments, Patients, Doctors and Specializations with multi-table INNER JOINs to list upcoming medical appointments.", shot:true, image:"images/6/db_joins.webp"},
        {label:"TABLE_CONSTRAINTS", text:"Enforcing integrity constraints on a library Books table — a UNIQUE ISBN and CHECK on publication year and available copies.", shot:true, image:"images/6/db_constraints.webp"},
        {label:"VIEWS_AND_TRIGGERS", text:"Creating an ActiveProUsers view and an AFTER DELETE trigger that archives deleted subscriptions to an audit table.", shot:true, image:"images/6/db_views_triggers.webp"}
      ] },
    { glyph:"07", tag:"Info Systems", title:"Information Systems", sub:"Building a small desktop information system with a relational back end.",
      year:"2025", context:"Academic", client:"LV6A Coursework", duration:"2 practicals", pc1:"#26343a", pc2:"#0b1214",
      image:"", url:"",
      tags:["Information Systems","Forms"], stack:["Visual Studio","C#","Microsoft Access"],
      sections:[
        {label:"VISUAL_STUDIO_INSTALL", text:"Installing Visual Studio 2022 with the .NET desktop development workload (C# and Visual Basic) to build the information system.", shot:true, image:"images/7/is_vs_install.webp"},
        {label:"FORM_DESIGN", text:"Designing a Customer Order Entry form in Microsoft Access with combo boxes, a total field and Submit / Clear / Exit actions.", shot:true, image:"images/7/is_form.webp"}
      ] },
    { glyph:"08", tag:"Networking", title:"Networking & Distributed Systems", sub:"IP configuration, multi-site network design and connectivity troubleshooting.",
      year:"2025", context:"Academic", client:"LV6A Coursework", duration:"3 practicals", pc1:"#26333a", pc2:"#0b1013",
      image:"", url:"",
      tags:["Networking","Simulation"], stack:["Network Simulator Pro","TCP/IP"],
      sections:[
        {label:"IP_CONFIGURATION", text:"Reading the full adapter configuration with ipconfig /all — IPv4 address, subnet mask, default gateway and DNS servers.", shot:true, image:"images/8/net_ipconfig.webp"},
        {label:"PACKET_TRACER_NETWORK", text:"Designing a multi-site network (Main Office, HQ branches and a Branch Office) with routers, VLAN switches, an access point and servers in a network simulator.", shot:true, image:"images/8/net_packet_tracer.webp"},
        {label:"NETWORK_TROUBLESHOOTING", text:"Troubleshooting connectivity with a continuous ping to 8.8.8.8, confirming stable replies and latency.", shot:true, image:"images/8/net_troubleshoot.webp"}
      ] },
    { glyph:"09", tag:"Web Design", title:"Web Design", sub:"Seven front-end builds spanning semantic HTML, responsive layout, and DOM-driven interactivity.",
      year:"2026", context:"Academic", client:"LV6A Coursework", duration:"7 builds", pc1:"#2c343a", pc2:"#0c1114",
      image:"", url:"",
      tags:["Front-End","Interactivity"], stack:["HTML","CSS","JavaScript","Bootstrap","jQuery"],
      sections:[
        {label:"BASIC_HTML_ELEMENTS", text:"Building a semantic recipe page — 'Classic Italian Tiramisu' — with header, article, figure, an ingredient list and tags.", shot:true, image:"images/9/web_basic_elements.webp"},
        {label:"HOSPITAL_WEBSITE_HOMEPAGE", text:"Building a responsive hospital homepage with Bootstrap — a hero banner, service cards and a full navigation bar with dropdowns.", shot:true, image:"images/9/wafula_hospital.webp"},
        {label:"DOM_ACCESS_LIVE_CLOCK", text:"Accessing and updating the DOM in JavaScript — a live-updating clock and a \"Generate New Quote\" button wired togetElementById.", shot:true, image:"images/9/web_dom_access.webp"},
        {label:"INTERNAL_STYLES", text:"Creating pure-CSS hover tooltips with internal styles and the :hover pseudo-class — no JavaScript.", shot:true, image:"images/9/web_internal_styles.webp"},
        {label:"JQUERY_DOM", text:"Building a tabbed settings interface (Profile, Security, Billing) driven by DOM updates.", shot:true, image:"images/9/web_jquery_dom.webp"},
        {label:"JS_ARRAYS", text:"Building a movie database filter that shows items by genre using JavaScript arrays.", shot:true, image:"images/9/web_js_arrays.webp"},
        {label:"JS_FUNCTIONS", text:"Creating a secure login form with a show/hide password toggle using JavaScript functions.", shot:true, image:"images/9/web_js_functions.webp"}
      ] },
    { glyph:"10", tag:"Graphic Design", title:"Graphic Design", sub:"Vector illustration and layout work, from tool fundamentals to a complete brand mark.",
      year:"2026", context:"Academic", client:"LV6A Coursework", duration:"4 pieces", pc1:"#342c3a", pc2:"#120d14",
      image:"", url:"",
      tags:["Illustration","Branding"], stack:["Adobe Illustrator","Canva"],
      sections:[
        {label:"ADOBE_ILLUSTRATOR", text:"Launching Adobe Illustrator 2024 and loading the workspace.", shot:true, image:"images/10/gd_illustrator.webp"},
        {label:"SHAPE_TOOLS_IN_ILLUSTRATOR", text:"Practicing Illustrator's shape tools — ellipse, rectangle, polygon and star — with fills, strokes and layered overlaps.", shot:true, image:"images/10/gd_shapes.webp"},
        {label:"WORLD_FORESTRY_DAY_POSTER", text:"Designing a \"World Forestry Day\" poster in Canva, layering tree silhouettes over a landscape photo with bold display type.", shot:true, image:"images/10/world_forest_day.webp"},
        {label:"LUMINA_ADVENTURES_LOGO", text:"Designing a complete Lumina Adventures shield logo in Illustrator, built from layered mountains, sun, forest and compass artwork.", shot:true, image:"images/10/gd_logo.webp"}
      ] }
  ];

  /* ============ shared state ============ */
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const state = {
    index:-1, card:null, view:'slider',
    open:false, animating:false, booted:false,
    reduced: motionQuery.matches
  };
  if(motionQuery.addEventListener) motionQuery.addEventListener('change', e => { state.reduced = e.matches; });

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, m => (
    {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]
  ));
  const cssUrl = src => 'url("' + String(src).replace(/"/g,'%22') + '")';
  function applyImage(el, src){
    if(!el) return;
    if(src){ el.classList.add('has-img'); el.style.setProperty('--img', cssUrl(src)); }
    else   { el.classList.remove('has-img'); el.style.removeProperty('--img'); }
  }

  /* =========================================================
     COVER ICONS
     ---------------------------------------------------------------
     One line-art symbol per unit/tag, used as the cover art for any
     case whose "image" field is left empty ("" = no photo). Shown
     in the grid card, the list row, and the dossier header — same
     three spots the real photo would occupy. Falls back to a plain
     document glyph for any tag not listed here.
     ========================================================= */
  const ICON_ATTRS = 'viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
  const ICONS = {
    'Hardware': '<svg '+ICON_ATTRS+'><rect x="14" y="14" width="20" height="20" rx="1"/><rect x="20" y="20" width="8" height="8"/><path d="M14 20H6M14 28H6M34 20h8M34 28h8M20 14V6M28 14V6M20 34v8M28 34v8"/></svg>',
    'OS': '<svg '+ICON_ATTRS+'><path d="M8 30a16 16 0 1 1 32 0"/><path d="M24 30 32 20"/><circle cx="24" cy="30" r="2"/><path d="M6 38h36"/></svg>',
    'Programming': '<svg '+ICON_ATTRS+'><path d="M16 14 6 24l10 10"/><path d="M32 14l10 10-10 10"/><path d="M27 10 21 38"/></svg>',
    'AI': '<svg '+ICON_ATTRS+'><circle cx="10" cy="12" r="3"/><circle cx="10" cy="24" r="3"/><circle cx="10" cy="36" r="3"/><circle cx="26" cy="24" r="3.4"/><circle cx="40" cy="16" r="3"/><circle cx="40" cy="32" r="3"/><path d="M13 12l10 10M13 24h10M13 36l10-10M29 21l8-4M29 27l8 4"/></svg>',
    'Algorithms': '<svg '+ICON_ATTRS+'><circle cx="24" cy="10" r="3"/><circle cx="12" cy="24" r="3"/><circle cx="36" cy="24" r="3"/><circle cx="6" cy="38" r="3"/><circle cx="18" cy="38" r="3"/><circle cx="30" cy="38" r="3"/><circle cx="42" cy="38" r="3"/><path d="M24 13l-10 8M24 13l10 8M12 27 6 35M12 27l6 8M36 27l-6 8M36 27l6 8"/></svg>',
    'Databases': '<svg '+ICON_ATTRS+'><ellipse cx="24" cy="12" rx="14" ry="5"/><path d="M10 12v24c0 2.8 6.3 5 14 5s14-2.2 14-5V12"/><path d="M10 24c0 2.8 6.3 5 14 5s14-2.2 14-5"/></svg>',
    'Info Systems': '<svg '+ICON_ATTRS+'><rect x="10" y="6" width="28" height="36" rx="1"/><path d="M16 16h16M16 23h16M16 30h10"/><rect x="16" y="34" width="4" height="4"/></svg>',
    'Networking': '<svg '+ICON_ATTRS+'><circle cx="24" cy="24" r="17"/><ellipse cx="24" cy="24" rx="7" ry="17"/><path d="M7 24h34M9 15h30M9 33h30"/></svg>',
    'Web Design': '<svg '+ICON_ATTRS+'><rect x="6" y="9" width="36" height="30" rx="1"/><path d="M6 17h36"/><circle cx="11" cy="13" r="1.2"/><circle cx="15" cy="13" r="1.2"/><circle cx="19" cy="13" r="1.2"/><path d="M14 26l-4 4 4 4M22 26l4 4-4 4"/></svg>',
    'Graphic Design': '<svg '+ICON_ATTRS+'><path d="M8 34 30 12l6 6-22 22z"/><path d="M30 12l6 6M8 34l-2 8 8-2"/><circle cx="38" cy="10" r="2.2"/></svg>',
    'default': '<svg '+ICON_ATTRS+'><rect x="12" y="6" width="24" height="36" rx="1"/><path d="M18 16h12M18 24h12M18 32h8"/></svg>'
  };
  const coverIcon = tag => '<span class="cover-icon">' + (ICONS[tag] || ICONS.default) + '</span>';

  /* =========================================================
     BOOT SEQUENCE
     ========================================================= */
  (function boot(){
    const el      = $('boot');
    const pctEl   = $('boot-pct');
    const logEl   = $('boot-log');
    const waveEl  = $('wave-path');
    const skipBtn = $('boot-skip');

    // ✏️ EDIT ME — the lines that type out bottom-left during boot.
    // Each row is [text, isOK]. isOK:1 renders the line in green
    // (use it for "success" lines); isOK:0 renders in muted grey.
    // They appear one after another automatically — no need to
    // change the timing math below, just add/remove/reword rows.
    const LOG = [
      ['> INIT_ARCHIVE', 0],
      ['> DECRYPT_KEY :: OK', 1],
      ['> INDEXING_FILES … ' + String(CASES.length).padStart(2,'0'), 0],
      ['> BIOMETRICS :: MATCHED', 1],
      ['> ESTABLISHING_SECURE_LINK', 0]
    ];
    LOG.forEach((row, i) => {
      const d = document.createElement('div');
      d.textContent = row[0];
      if(row[1]) d.className = 'ok';
      d.style.animationDelay = (0.35 + i * 0.34) + 's';
      logEl.appendChild(d);
    });

    let finished = false;
    let raf = 0;
    // ✏️ EDIT ME — how long the boot animation runs, in milliseconds.
    // 2400 = 2.4 seconds. Visitors can always skip it early (SKIP
    // button, Esc, Enter, or Space), so it's safe to make this a
    // little longer if you want the effect to breathe.
    const DURATION = 2400;
    const start = performance.now();

    // original waveform: layered sine noise, amplitude rises with progress
    const POINTS = 160;
    function drawWave(t, amp){
      let out = '';
      for(let i = 0; i <= POINTS; i++){
        const x = (i / POINTS) * 1000;
        const env = Math.sin((i / POINTS) * Math.PI);          // taper at both ends
        const n =
          Math.sin(i * 0.42 + t * 3.1) * 0.6 +
          Math.sin(i * 1.17 - t * 4.7) * 0.28 +
          Math.sin(i * 2.63 + t * 1.9) * 0.12;
        const spike = (i % 37 === 0) ? Math.sin(t * 9) * 0.5 : 0;
        const y = 90 - (n + spike) * amp * env;
        out += x.toFixed(1) + ',' + y.toFixed(1) + ' ';
      }
      waveEl.setAttribute('points', out.trim());
    }

    function setPct(v){
      // Zero-padded to a fixed 3 digits ("007%" … "100%") so the string
      // is always the same length — otherwise the display font's digits
      // aren't perfectly uniform-width and the number visibly jitters/
      // resizes as it counts up.
      const digits = String(Math.round(v)).padStart(3, '0');
      pctEl.innerHTML = digits + '<span class="sign">%</span>';
    }

    function tick(now){
      const elapsed = now - start;
      const p = Math.min(elapsed / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 2.2);                   // decelerating climb
      const jitter = p < 1 ? (Math.random() * 1.6 - 0.8) : 0;   // reads like a live signal
      setPct(Math.min(100, Math.max(0, eased * 100 + jitter)));
      drawWave(elapsed / 1000, 8 + eased * 46);
      if(p < 1){ raf = requestAnimationFrame(tick); }
      else { setPct(100); setTimeout(finish, 150); }
    }

    function finish(){
      if(finished) return;
      finished = true;
      if(raf) cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
      setPct(100);
      el.classList.add('done');
      document.body.classList.remove('booting');
      document.body.classList.add('booted');
      state.booted = true;
      setTimeout(() => { el.remove(); }, state.reduced ? 20 : 800);
    }

    function onKey(e){ if(e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish(); }
    skipBtn.addEventListener('click', finish);
    document.addEventListener('keydown', onKey);

    if(state.reduced){ setPct(100); finish(); return; }
    drawWave(0, 8);
    raf = requestAnimationFrame(tick);
    setTimeout(finish, DURATION + 2500);                        // hard safety net
  })();

  /* =========================================================
     HERO POINTER FX — one rAF loop
     ========================================================= */
  (function heroFX(){
    const hero   = $('hero');
    const center = $('hero-center');
    const wrapEl = $('name-wrap');
    const line   = $('mouse-line');
    const dot    = $('mouse-dot');
    const coord  = $('mouse-coord');
    if(!window.matchMedia('(pointer: fine)').matches) return;

    const m = { x:0, y:0, raf:0 };
    function render(){
      m.raf = 0;
      if(state.reduced) return;
      line.style.transform  = 'translateY(' + m.y + 'px)';
      dot.style.transform   = 'translate(' + m.x + 'px,' + m.y + 'px) translate(-50%,-50%)';
      coord.style.transform = 'translate(' + m.x + 'px,' + m.y + 'px) translate(10px,-50%)';
      coord.textContent = 'X: ' + Math.round(m.x) + ' Y: ' + Math.round(m.y);
      const r = wrapEl.getBoundingClientRect();
      center.style.setProperty('--mx', (m.x - r.left) + 'px');
      center.style.setProperty('--my', (m.y - r.top)  + 'px');
      center.style.setProperty('--px', ((m.x / window.innerWidth  - .5) * 2).toFixed(3));
      center.style.setProperty('--py', ((m.y / window.innerHeight - .5) * 2).toFixed(3));
    }
    hero.addEventListener('pointermove', e => {
      if(state.reduced || state.open || !state.booted) return;
      m.x = e.clientX; m.y = e.clientY;
      hero.classList.add('tracking');
      if(!m.raf) m.raf = requestAnimationFrame(render);
    }, {passive:true});
    hero.addEventListener('pointerleave', () => hero.classList.remove('tracking'));
  })();

  /* ============ element refs ============ */
  const track    = $('slider-track');
  const viewport = $('slider-viewport');
  const listView = $('list-view');
  const navArrows= $('nav-arrows');
  const backdrop = $('backdrop');
  const dossier  = $('dossier');
  const dScroll  = $('d-scroll');
  const dHero    = $('d-hero');
  const glitch   = $('glitch');
  const closeBtn = $('close-btn');
  const prevBtn  = $('d-prev');
  const nextBtn  = $('d-next');
  const accessBtn= $('m-access');

  $('file-count').textContent = String(CASES.length).padStart(2,'0');

  /* ============ build slider cards ============ */
  function buildCards(){
    track.innerHTML = '';
    CASES.forEach((c, i) => {
      const card = document.createElement('article');
      card.className = 'evidence-card';
      card.tabIndex = 0;
      card.dataset.index = i;
      card.setAttribute('role','button');
      card.setAttribute('aria-label', 'Decrypt file: ' + c.title);
      card.style.setProperty('--pc1', c.pc1);
      card.style.setProperty('--pc2', c.pc2);
      card.innerHTML =
        '<div class="card-photo">' + coverIcon(c.tag) + '</div>' +
        '<div class="card-dots"><span></span><span></span><span></span></div>' +
        '<div class="card-tag-vert">' + esc(c.tag.toUpperCase()) + '</div>' +
        '<span class="card-frame"></span>' +
        '<span class="card-corner tl"></span><span class="card-corner tr"></span>' +
        '<span class="card-corner bl"></span><span class="card-corner br"></span>' +
        '<div class="card-scrim"></div>' +
        '<div class="card-body">' +
          '<div class="card-num">EVIDENCE #' + esc(c.glyph) + '</div>' +
          '<div class="card-title">' + esc(c.title) + '</div>' +
          '<div class="card-rule"></div>' +
          '<div class="card-cta">[ CLICK TO DECRYPT ]</div>' +
        '</div>';
      applyImage(card.querySelector('.card-photo'), c.image);
      card.addEventListener('click', () => openFile(i, card));
      card.addEventListener('keydown', e => {
        if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openFile(i, card); }
      });
      track.appendChild(card);
    });
  }

  /* ============ build full-bleed list rows ============ */
  function buildList(){
    listView.innerHTML = '';
    CASES.forEach((c, i) => {
      const row = document.createElement('article');
      row.className = 'list-row';
      row.tabIndex = 0;
      row.dataset.index = i;
      row.setAttribute('role','button');
      row.setAttribute('aria-label', 'Decrypt file: ' + c.title);
      row.style.setProperty('--pc1', c.pc1);
      row.style.setProperty('--pc2', c.pc2);
      row.innerHTML =
        '<span class="list-bg">' + coverIcon(c.tag) + '</span>' +
        '<span class="list-scrim"></span>' +
        '<span class="list-ticks"></span>' +
        '<span class="list-main">' +
          '<span class="list-num">EVIDENCE #' + esc(c.glyph) + '</span>' +
          '<span class="list-title">' + esc(c.title) + '</span>' +
        '</span>' +
        '<span class="list-meta">' +
          '<span class="list-tag">' + esc(c.tag.toUpperCase()) + '</span>' +
          '<span class="list-cta">[ CLICK TO DECRYPT ]</span>' +
          '<span class="list-arrow"></span>' +
        '</span>';
      applyImage(row.querySelector('.list-bg'), c.image);
      row.addEventListener('click', () => openFile(i, row));
      row.addEventListener('keydown', e => {
        if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openFile(i, row); }
      });
      listView.appendChild(row);
    });
  }

  buildCards();
  buildList();

  // staggered row reveal on scroll
  const rowObserver = ('IntersectionObserver' in window)
    ? new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if(!entry.isIntersecting) return;
          const el = entry.target;
          const delay = state.reduced ? 0 : (Number(el.dataset.index) % 4) * 70;
          setTimeout(() => el.classList.add('in'), delay);
          obs.unobserve(el);
        });
      }, {rootMargin:'0px 0px -8% 0px', threshold:0.12})
    : null;

  function observeRows(){
    Array.prototype.forEach.call(listView.children, el => {
      if(rowObserver) rowObserver.observe(el); else el.classList.add('in');
    });
  }

  $('nav-prev').addEventListener('click', () => viewport.scrollBy({left:-380, behavior: state.reduced ? 'auto' : 'smooth'}));
  $('nav-next').addEventListener('click', () => viewport.scrollBy({left: 380, behavior: state.reduced ? 'auto' : 'smooth'}));

  /* ============ view toggle ============ */
  const sliderBtn = $('view-slider-btn');
  const listBtn   = $('view-list-btn');
  function setView(view){
    if(state.open) return;
    state.view = view;
    const slider = view === 'slider';
    sliderBtn.classList.toggle('active', slider);
    listBtn.classList.toggle('active', !slider);
    sliderBtn.setAttribute('aria-pressed', String(slider));
    listBtn.setAttribute('aria-pressed', String(!slider));
    viewport.hidden = !slider;
    listView.hidden = slider;
    navArrows.hidden = !slider;                 // arrows only mean something in slider view
    if(!slider) observeRows();
  }
  sliderBtn.addEventListener('click', () => setView('slider'));
  listBtn.addEventListener('click', () => setView('list'));

  function currentItems(){
    return state.view === 'list' ? listView.children : track.children;
  }

  /* ============ fill dossier ============ */
  let outlineObserver = null;
  function fillDossier(c){
    $('d-filenum').textContent  = 'EVIDENCE #' + c.glyph;
    $('d-category').textContent = c.tag.toUpperCase();
    $('d-title').textContent    = c.title;
    $('d-sub').textContent      = c.sub;
    $('m-tags').innerHTML  = c.tags.map(t => '<span>' + esc(t) + '</span>').join('');
    $('m-stack').innerHTML = c.stack.map(t => '<span>' + esc(t) + '</span>').join('');

    if(c.url){
      accessBtn.href = c.url;
      accessBtn.classList.remove('is-disabled');
      accessBtn.removeAttribute('aria-disabled');
      accessBtn.textContent = 'ACCESS SITE';
    } else {
      accessBtn.removeAttribute('href');
      accessBtn.classList.add('is-disabled');
      accessBtn.setAttribute('aria-disabled','true');
      accessBtn.textContent = 'NO PUBLIC URL';
    }

    dHero.style.setProperty('--pc1', c.pc1);
    dHero.style.setProperty('--pc2', c.pc2);
    dHero.innerHTML = coverIcon(c.tag);
    applyImage(dHero, c.image);

    $('d-content').innerHTML = c.sections.map((s, i) => {
      const head = '<div class="d-section-label">&gt;&gt; ' + esc(s.label) + '</div>' +
                   '<p class="d-text">' + esc(s.text) + '</p>';
      const shot = !s.shot ? '' : (() => {
        const style = s.image
          ? '--img:' + cssUrl(s.image)
          : '--sc1:' + esc(s.sc1 || c.pc1) + ';--sc2:' + esc(s.sc2 || c.pc2);
        return '<div class="shot' + (s.image ? ' has-img' : '') + '" style=\'' + style + '\'>' +
          '<span class="shot-glyph">' + esc(c.glyph) + '</span>' +
          '<span class="shot-corner tl"></span><span class="shot-corner br"></span>' +
          '<span class="shot-tag">EXAMINE_IMG</span>' +
        '</div>';
      })();
      return '<div class="d-section" id="d-sec-' + i + '" data-index="' + i + '">' + head + shot + '</div>';
    }).join('');

    // ------- "IN THIS FILE" outline: jump links that track scroll position -------
    const outlineEl = $('d-outline');
    outlineEl.innerHTML = c.sections.map((s, i) =>
      '<button type="button" class="d-outline-item" data-index="' + i + '">' +
        '<span class="d-outline-num">' + String(i + 1).padStart(2, '0') + '</span>' +
        '<span class="d-outline-text">' + esc(s.label) + '</span>' +
      '</button>'
    ).join('');
    outlineEl.querySelectorAll('.d-outline-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = $('d-sec-' + btn.dataset.index);
        if(target) target.scrollIntoView({ block:'start', behavior: state.reduced ? 'auto' : 'smooth' });
      });
    });

    if(outlineObserver) outlineObserver.disconnect();
    const sectionEls = $('d-content').querySelectorAll('.d-section');
    if('IntersectionObserver' in window && sectionEls.length){
      outlineObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const item = outlineEl.querySelector('.d-outline-item[data-index="' + entry.target.dataset.index + '"]');
          if(item) item.classList.toggle('active', entry.isIntersecting);
        });
      }, { root: dScroll, rootMargin:'-10% 0px -75% 0px', threshold:0 });
      sectionEls.forEach(el => outlineObserver.observe(el));
    } else {
      const first = outlineEl.querySelector('.d-outline-item');
      if(first) first.classList.add('active');
    }
  }

  /* ============ geometry ============ */
  function dossierTarget(){
    const pad = window.innerWidth < 720 ? 0 : 26;
    return { top:pad, left:pad, width:window.innerWidth - pad*2, height:window.innerHeight - pad*2 };
  }
  function setBox(el, box){
    el.style.top = box.top + 'px'; el.style.left = box.left + 'px';
    el.style.width = box.width + 'px'; el.style.height = box.height + 'px';
  }

  const DOSSIER_MS = 600;
  function afterDossierTransition(cb){
    let done = false, timer = null;
    const finish = () => {
      if(done) return;
      done = true;
      dossier.removeEventListener('transitionend', onEnd);
      if(timer) clearTimeout(timer);
      cb();
    };
    const onEnd = e => {
      if(e.target !== dossier) return;
      if(e.propertyName !== 'height' && e.propertyName !== 'width') return;
      finish();
    };
    if(state.reduced){ finish(); return; }
    dossier.addEventListener('transitionend', onEnd);
    timer = setTimeout(finish, DOSSIER_MS + 250);
  }

  /* ============ open / step / close ============ */
  function markActive(index){
    const items = currentItems();
    Array.prototype.forEach.call(items, el => el.classList.remove('is-active'));
    const el = items[index] || null;
    if(el) el.classList.add('is-active');
    state.index = index;
    state.card  = el;
    return el;
  }

  function runGlitch(rect){
    if(state.reduced) return;
    glitch.style.top = rect.top + 'px';
    glitch.style.left = rect.left + 'px';
    glitch.style.width = rect.width + 'px';
    glitch.style.height = rect.height + 'px';
    glitch.classList.remove('run');
    void glitch.offsetWidth;
    glitch.classList.add('run');
  }

  function openFile(index, el){
    if(state.animating || state.open) return;
    state.animating = true;
    state.open = true;

    const startRect = el.getBoundingClientRect();
    markActive(index);
    track.classList.add('dim');
    listView.classList.add('dim');
    document.body.classList.add('locked');

    fillDossier(CASES[index]);
    dossier.classList.remove('content-visible');
    dScroll.scrollTop = 0;
    runGlitch(startRect);

    dossier.classList.add('no-anim');
    setBox(dossier, {top:startRect.top, left:startRect.left, width:startRect.width, height:startRect.height});
    dossier.style.display = 'block';
    dossier.setAttribute('aria-hidden','false');
    backdrop.classList.add('open');
    void dossier.offsetWidth;

    requestAnimationFrame(() => {
      dossier.classList.remove('no-anim');
      setBox(dossier, dossierTarget());
    });

    afterDossierTransition(() => {
      dossier.classList.add('content-visible');
      document.body.classList.add('dossier-open');
      state.animating = false;
      document.addEventListener('keydown', onKeydown);
      closeBtn.focus({preventScroll:true});
    });
  }

  function step(dir){
    if(!state.open || state.animating || state.index < 0) return;
    const next = (state.index + dir + CASES.length) % CASES.length;
    if(next === state.index) return;

    state.animating = true;
    markActive(next);
    dossier.classList.remove('content-visible');

    const swap = () => {
      fillDossier(CASES[next]);
      dScroll.scrollTop = 0;
      requestAnimationFrame(() => {
        dossier.classList.add('content-visible');
        state.animating = false;
      });
    };
    if(state.reduced) swap(); else setTimeout(swap, 200);
  }

  function closeFile(){
    if(!state.open || state.animating) return;
    state.animating = true;

    dossier.classList.remove('content-visible');
    document.body.classList.remove('dossier-open');
    document.removeEventListener('keydown', onKeydown);

    const card = state.card;
    const rect = card ? card.getBoundingClientRect() : null;
    const collapsible = rect && rect.width > 0 && rect.height > 0;

    const finish = () => {
      dossier.style.display = 'none';
      dossier.setAttribute('aria-hidden','true');
      backdrop.classList.remove('open');
      track.classList.remove('dim');
      listView.classList.remove('dim');
      document.body.classList.remove('locked');
      Array.prototype.forEach.call(currentItems(), el => el.classList.remove('is-active'));
      if(card && card.isConnected) card.focus({preventScroll:true});
      state.card = null; state.index = -1; state.open = false; state.animating = false;
    };

    setTimeout(() => {
      if(collapsible){
        setBox(dossier, {top:rect.top, left:rect.left, width:rect.width, height:rect.height});
        afterDossierTransition(finish);
      } else { finish(); }
    }, state.reduced ? 0 : 120);
  }

  function onKeydown(e){
    if(e.key === 'Escape'){ e.preventDefault(); closeFile(); }
    else if(e.key === 'ArrowRight') step(1);
    else if(e.key === 'ArrowLeft')  step(-1);
    else if(e.key === 'Tab') trapFocus(e);
  }

  function trapFocus(e){
    const inside = dossier.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
    const list = Array.prototype.filter.call(inside, el => el.offsetParent !== null);
    const extra = [prevBtn, nextBtn].filter(b => getComputedStyle(b).visibility !== 'hidden');
    const all = list.concat(extra);
    if(!all.length) return;
    const first = all[0], last = all[all.length - 1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  }

  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));
  closeBtn.addEventListener('click', closeFile);
  backdrop.addEventListener('click', closeFile);

  let resizeRaf = 0;
  window.addEventListener('resize', () => {
    if(!state.open || state.animating || resizeRaf) return;
    resizeRaf = requestAnimationFrame(() => {
      resizeRaf = 0;
      dossier.classList.add('no-anim');
      setBox(dossier, dossierTarget());
      void dossier.offsetWidth;
      dossier.classList.remove('no-anim');
    });
  });
})();
