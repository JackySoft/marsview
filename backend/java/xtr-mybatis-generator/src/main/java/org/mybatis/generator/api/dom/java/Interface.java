/**
 * Copyright 2006-2016 the original author or authors.
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.mybatis.generator.api.dom.java;

import java.util.*;

import static org.mybatis.generator.api.dom.OutputUtilities.*;
import static org.mybatis.generator.internal.util.StringUtility.stringHasValue;

/**
 * The Class Interface.
 *
 * @author Jeff Butler
 */
public class Interface extends JavaElement implements CompilationUnit {

    /**
     * The imported types.
     */
    private Set<FullyQualifiedJavaType> importedTypes;

    /**
     * The static imports.
     */
    private Set<String> staticImports;

    /**
     * The type.
     */
    private FullyQualifiedJavaType type;

    /**
     * The super interface types.
     */
    private Set<FullyQualifiedJavaType> superInterfaceTypes;

    /**
     * The methods.
     */
    private List<Method> methods;

    /**
     * The file comment lines.
     */
    private List<String> fileCommentLines;

    /**
     * The super class.
     */
    private FullyQualifiedJavaType superClass;

    /**
     * Instantiates a new interface.
     *
     * @param type the type
     */
    public Interface(FullyQualifiedJavaType type) {
        super();
        this.type = type;
        superInterfaceTypes = new LinkedHashSet<FullyQualifiedJavaType>();
        methods = new ArrayList<Method>();
        importedTypes = new TreeSet<FullyQualifiedJavaType>();
        fileCommentLines = new ArrayList<String>();
        staticImports = new TreeSet<String>();
    }

    /**
     * Instantiates a new interface.
     *
     * @param type the type
     */
    public Interface(String type) {
        this(new FullyQualifiedJavaType(type));
    }

    /**
     * (non-Javadoc)
     *
     * @see org.mybatis.generator.api.dom.java.CompilationUnit#getImportedTypes()
     */
    @Override
    public Set<FullyQualifiedJavaType> getImportedTypes() {
        return Collections.unmodifiableSet(importedTypes);
    }

    /**
     * (non-Javadoc)
     *
     * @see org.mybatis.generator.api.dom.java.CompilationUnit#addImportedType(org.mybatis.generator.api.dom.java.FullyQualifiedJavaType)
     */
    @Override
    public void addImportedType(FullyQualifiedJavaType importedType) {
        if (importedType.isExplicitlyImported()
                && !importedType.getPackageName().equals(type.getPackageName())) {
            importedTypes.add(importedType);
        }
    }

    /**
     * 组装
     *
     * @return
     */
    private StringBuilder getSb() {
        StringBuilder sb = new StringBuilder();

        for (String commentLine : fileCommentLines) {
            sb.append(commentLine);
            newLine(sb);
        }

        if (stringHasValue(getType().getPackageName())) {
            sb.append("package ");
            sb.append(getType().getPackageName());
            sb.append(';');
            newLine(sb);
            newLine(sb);
        }

        for (String staticImport : staticImports) {
            sb.append("import static ");
            sb.append(staticImport);
            sb.append(';');
            newLine(sb);
        }

        if (staticImports.size() > 0) {
            newLine(sb);
        }
        return sb;
    }

    /**
     * (non-Javadoc)
     *
     * @see org.mybatis.generator.api.dom.java.CompilationUnit#getFormattedContent()
     */
    @Override
    public String getFormattedContent() {
        StringBuilder sb = getSb();

        Set<String> importStrings = calculateImports(importedTypes);
        for (String importString : importStrings) {
            sb.append(importString);
            newLine(sb);
        }

        if (importStrings.size() > 0) {
            newLine(sb);
        }

        int indentLevel = 0;

        addFormattedJavadoc(sb, indentLevel);
        addFormattedAnnotations(sb, indentLevel);

        sb.append(getVisibility().getValue());

        if (isStatic()) {
            sb.append("static ");
        }

        if (isFinal()) {
            sb.append("final ");
        }

        sb.append("interface ");
        sb.append(getType().getShortName());

        if (getSuperInterfaceTypes().size() > 0) {
            sb.append(" extends ");

            boolean comma = false;
            for (FullyQualifiedJavaType fqjt : getSuperInterfaceTypes()) {
                if (comma) {
                    sb.append(", ");
                } else {
                    comma = true;
                }

                sb.append(JavaDomUtils.calculateTypeName(this, fqjt));
            }
        }

        sb.append(" {");
        indentLevel++;

        Iterator<Method> mtdIter = getMethods().iterator();
        while (mtdIter.hasNext()) {
            newLine(sb);
            Method method = mtdIter.next();
            sb.append(method.getFormattedContent(indentLevel, true, this));
            if (mtdIter.hasNext()) {
                newLine(sb);
            }
        }

        indentLevel--;
        newLine(sb);
        javaIndent(sb, indentLevel);
        sb.append('}');

        return sb.toString();
    }

    /**
     * Adds the super interface.
     *
     * @param superInterface the super interface
     */
    @Override
    public void addSuperInterface(FullyQualifiedJavaType superInterface) {
        superInterfaceTypes.add(superInterface);
    }

    /**
     * Gets the methods.
     *
     * @return Returns the methods.
     */
    public List<Method> getMethods() {
        return methods;
    }

    /**
     * Adds the method.
     *
     * @param method the method
     */
    public void addMethod(Method method) {
        methods.add(method);
    }

    /**
     * Gets the type.
     *
     * @return Returns the type.
     */
    @Override
    public FullyQualifiedJavaType getType() {
        return type;
    }

    /**
     * (non-Javadoc)
     *
     * @see org.mybatis.generator.api.dom.java.CompilationUnit#getSuperClass()
     */
    @Override
    public FullyQualifiedJavaType getSuperClass() {
        // interfaces do not have superclasses
        return superClass;
    }

    @Override
    public void setSuperClass(FullyQualifiedJavaType superClass) {
        this.superClass = superClass;
    }

    /**
     * (non-Javadoc)
     *
     * @see org.mybatis.generator.api.dom.java.CompilationUnit#getSuperInterfaceTypes()
     */
    @Override
    public Set<FullyQualifiedJavaType> getSuperInterfaceTypes() {
        return superInterfaceTypes;
    }

    /**
     * (non-Javadoc)
     *
     * @see org.mybatis.generator.api.dom.java.CompilationUnit#isJavaInterface()
     */
    @Override
    public boolean isJavaInterface() {
        return true;
    }

    /**
     * (non-Javadoc)
     *
     * @see org.mybatis.generator.api.dom.java.CompilationUnit#isJavaEnumeration()
     */
    @Override
    public boolean isJavaEnumeration() {
        return false;
    }

    /**
     * (non-Javadoc)
     *
     * @see org.mybatis.generator.api.dom.java.CompilationUnit#addFileCommentLine(java.lang.String)
     */
    @Override
    public void addFileCommentLine(String commentLine) {
        fileCommentLines.add(commentLine);
    }

    /**
     * (non-Javadoc)
     *
     * @see org.mybatis.generator.api.dom.java.CompilationUnit#getFileCommentLines()
     */
    @Override
    public List<String> getFileCommentLines() {
        return fileCommentLines;
    }

    /**
     * (non-Javadoc)
     *
     * @see org.mybatis.generator.api.dom.java.CompilationUnit#addImportedTypes(java.util.Set)
     */
    @Override
    public void addImportedTypes(Set<FullyQualifiedJavaType> importedTypes) {
        this.importedTypes.addAll(importedTypes);
    }

    /**
     * (non-Javadoc)
     *
     * @see org.mybatis.generator.api.dom.java.CompilationUnit#getStaticImports()
     */
    @Override
    public Set<String> getStaticImports() {
        return staticImports;
    }

    /**
     * (non-Javadoc)
     *
     * @see org.mybatis.generator.api.dom.java.CompilationUnit#addStaticImport(java.lang.String)
     */
    @Override
    public void addStaticImport(String staticImport) {
        staticImports.add(staticImport);
    }

    /**
     * (non-Javadoc)
     *
     * @see org.mybatis.generator.api.dom.java.CompilationUnit#addStaticImports(java.util.Set)
     */
    @Override
    public void addStaticImports(Set<String> staticImports) {
        this.staticImports.addAll(staticImports);
    }
}
