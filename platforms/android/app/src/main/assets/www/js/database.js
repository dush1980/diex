function get_db(){

    if(!global_db){ // if no connection exist already, create new one
        if(browserView){ //if using browser, sqlite is activated different
            global_db = window.openDatabase('diex.db', '', 'Diex', 2 * 1024 * 1024);
        } else {
            global_db = window.sqlitePlugin.openDatabase({
                name: 'diex.db',
                location: 'default',
                androidDatabaseProvider: 'system'
            });
        }
    }
    return global_db;    
}

function init_db(){
    //nothing to do if the DB already initialized
    db_setup_init = get_key('db_setup_init');
    if(db_setup_init && db_setup_init == 'ready') {
        console.log('DB already setup');
        dbReady = true;
        whenAllReady();
        return true;
    }
    
    let db = get_db();
    db.transaction(function(tx) {
        if(db_setup_init == 'redo'){
            //todo : remove tables and recreate
        }
        tx.executeSql("CREATE TABLE IF NOT EXISTS tbl_ava_colour ( ava_colour_name TEXT, ava_colour_code TEXT)");
        tx.executeSql("CREATE TABLE IF NOT EXISTS tbl_ava_icon ( ava_icon_name TEXT, ava_icon_code TEXT )");
        tx.executeSql("CREATE TABLE IF NOT EXISTS tbl_calendar ("+
            " cal_epoch INTEGER,"+
            " cal_holiday INTEGER,"+
            " cal_year INTEGER,"+
            " cal_month INTEGER,"+
            " cal_date INTEGER,"+
            " PRIMARY KEY( cal_epoch , cal_holiday )"+
        " )");
        tx.executeSql("CREATE TABLE IF NOT EXISTS tbl_entries ("+          
            " entry_index INTEGER NOT NULL,"+
            " entry_text TEXT NOT NULL,"+
            " entry_date INTEGER NOT NULL"+
        " )");
        tx.executeSql("CREATE TABLE IF NOT EXISTS tbl_holiday ("+
            " hol_name TEXT NOT NULL,"+
            " hol_colour TEXT NOT NULL"+
        " )");
        tx.executeSql("CREATE TABLE IF NOT EXISTS tbl_index ("+
            " index_name TEXT NOT NULL,"+
            " index_icon TEXT DEFAULT 'default_icon',"+
            " index_colour TEXT DEFAULT 'green',"+
            " index_status INTEGER NOT NULL DEFAULT 0"+
        " )");
 
        tx.executeSql("CREATE TABLE IF NOT EXISTS tbl_index ("+
            " index_name TEXT NOT NULL,"+
            " index_icon TEXT DEFAULT 'default_icon',"+
            " index_colour TEXT DEFAULT 'green',"+
            " index_status INTEGER DEFAULT 0"+
        " )");
 
        tx.executeSql("CREATE INDEX IF NOT EXISTS idx_entry_date ON tbl_entries ( entry_date )");
        tx.executeSql("CREATE INDEX IF NOT EXISTS idx_entry_index ON tbl_entries ( entry_index )");
 
        //tx.executeSql('CREATE TABLE IF NOT EXISTS DemoTable (name, score)');
        //tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202]);

        tx.executeSql('INSERT INTO tbl_ava_colour (ava_colour_name, ava_colour_code) VALUES (?,?)', ['Dark Green', 'bg-green-dark']);
        tx.executeSql('INSERT INTO tbl_ava_colour (ava_colour_name, ava_colour_code) VALUES (?,?)', ['Dark Blue', 'bg-blue-dark']);
        tx.executeSql('INSERT INTO tbl_ava_colour (ava_colour_name, ava_colour_code) VALUES (?,?)', ['Light Green', 'bg-green-light']);
        tx.executeSql('INSERT INTO tbl_ava_colour (ava_colour_name, ava_colour_code) VALUES (?,?)', ['Dark Yellow', 'bg-yellow-dark']);

        tx.executeSql('INSERT INTO tbl_ava_icon (ava_icon_name, ava_icon_code) VALUES (?,?)', ['Note', 'note']);
        tx.executeSql('INSERT INTO tbl_ava_icon (ava_icon_name, ava_icon_code) VALUES (?,?)', ['Exclamation', 'exclamation']);
        tx.executeSql('INSERT INTO tbl_ava_icon (ava_icon_name, ava_icon_code) VALUES (?,?)', ['Comment', 'comment']);
        tx.executeSql('INSERT INTO tbl_ava_icon (ava_icon_name, ava_icon_code) VALUES (?,?)', ['List', 'list']);
        
        tx.executeSql('INSERT INTO tbl_index (index_name, index_icon, index_colour) VALUES (?,?,?)', ['Note', 'note', 'bg-green-dark']);
        tx.executeSql('INSERT INTO tbl_index (index_name, index_icon, index_colour) VALUES (?,?,?)', ['Important', 'exclamation', 'bg-blue-dark']);
        tx.executeSql('INSERT INTO tbl_index (index_name, index_icon, index_colour) VALUES (?,?,?)', ['Comment', 'comment', 'bg-green-light']);
        tx.executeSql('INSERT INTO tbl_index (index_name, index_icon, index_colour) VALUES (?,?,?)', ['List', 'list', 'bg-yellow-dark']);
 
    }, function(error) {
        console_log('DB initialization ERROR: ' + error.message);
        close_app();
    }, function() {
        console.log('DB Succesfully initialized.');
        dbReady = true;
        set_key('db_setup_init', 'ready');
        whenAllReady();
    });
}