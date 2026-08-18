import { sequelize } from '../config/db.js';

export const verifyDatabaseStructure = async () => {
  try {
    console.log('====================================================');
    console.log('🔍 CITYSCENE GLOBAL MYSQL SCHEMA AUDIT & VERIFICATION');
    console.log('====================================================\n');

    await sequelize.authenticate();
    console.log('✅ 1. Database Connection: VERIFIED (cityscene_global)\n');

    const expectedTables = [
      'admins',
      'applications',
      'blogs',
      'clients',
      'contacts',
      'home_contents',
      'jobs',
      'projects',
      'services',
      'testimonials'
    ];

    // Query existing tables in database
    const [tablesResult] = await sequelize.query('SHOW TABLES;');
    const existingTables = tablesResult.map(row => Object.values(row)[0]);

    console.log('📋 2. Expected SQL Tables Audit:');
    let allTablesExist = true;

    for (const table of expectedTables) {
      const exists = existingTables.includes(table);
      if (exists) {
        console.log(`   - 🟢 [EXISTING] Table: ${table}`);
      } else {
        console.log(`   - 🔴 [MISSING]  Table: ${table}`);
        allTablesExist = false;
      }
    }

    if (!allTablesExist) {
      throw new Error('Verification failed: One or more expected tables are missing.');
    }
    console.log('\n✅ All 10 SQL tables exist in "cityscene_global".\n');

    // Query Primary Keys
    console.log('🔑 3. Primary Key Audit:');
    const [pkResult] = await sequelize.query(`
      SELECT TABLE_NAME, COLUMN_NAME
      FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = DATABASE() AND CONSTRAINT_NAME = 'PRIMARY';
    `);

    const pkMap = {};
    pkResult.forEach(row => {
      pkMap[row.TABLE_NAME] = row.COLUMN_NAME;
    });

    for (const table of expectedTables) {
      console.log(`   - 🗝️ ${table.padEnd(16)} -> Primary Key: [ ${pkMap[table] || 'NONE'} ]`);
    }
    console.log('');

    // Query Foreign Keys
    console.log('🔗 4. Foreign Key Audit:');
    const [fkResult] = await sequelize.query(`
      SELECT TABLE_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
      FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = DATABASE() AND REFERENCED_TABLE_NAME IS NOT NULL;
    `);

    if (fkResult.length === 0) {
      console.log('   (No foreign keys found)');
    } else {
      fkResult.forEach(fk => {
        console.log(`   - 🔗 ${fk.TABLE_NAME}.${fk.COLUMN_NAME} -> ${fk.REFERENCED_TABLE_NAME}.${fk.REFERENCED_COLUMN_NAME}`);
      });
    }
    console.log('');

    // Query Indexes
    console.log('⚡ 5. Important Indexes Audit:');
    const [indexResult] = await sequelize.query(`
      SELECT TABLE_NAME, INDEX_NAME, COLUMN_NAME, NON_UNIQUE
      FROM INFORMATION_SCHEMA.STATISTICS
      WHERE TABLE_SCHEMA = DATABASE() AND INDEX_NAME != 'PRIMARY';
    `);

    indexResult.forEach(idx => {
      const typeStr = idx.NON_UNIQUE === 0 ? 'UNIQUE INDEX' : 'INDEX';
      console.log(`   - ⚡ ${idx.TABLE_NAME} -> ${idx.INDEX_NAME} (${idx.COLUMN_NAME}) [${typeStr}]`);
    });

    console.log('\n====================================================');
    console.log('🎉 SCHEMA VERIFICATION COMPLETE & SUCCESSFUL!');
    console.log('====================================================');

    return {
      success: true,
      tables: existingTables,
      primaryKeys: pkMap,
      foreignKeys: fkResult,
      indexes: indexResult
    };
  } catch (error) {
    console.error('❌ Schema Verification Error:', error.message);
    throw error;
  }
};

if (process.argv[1].endsWith('verify-db.js')) {
  verifyDatabaseStructure().then(() => process.exit(0)).catch(() => process.exit(1));
}
